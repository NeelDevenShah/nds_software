const express=require("express");
const router=express.Router();
const {body, validationResult}=require("express-validator");
const newCompany=require("../models/Company_registry");
const companyUser=require("../models/CompanyUser")
const salesOrder=require("../models/SalesOrder");
const salesOrderMini=require("../models/SalesOrderMini");
const CmpLogADetailBook=require("../models/CmpLogADetailBook")
const fetchcompany=require("../middleware/fetchcompany");
const fetchuser=require("../middleware/fetchuser")

//CASE 1: Add new sales order Endpoint
router.post("/addneworder", fetchuser, async (req, res)=>{
    const {companyId, employeeId}=req.details;
    let cmpcheck=await newCompany.findOne({companyId: companyId})
    if(!cmpcheck)
    {
        return res.status(400).send({error: "The company id does not exists"})
    }
    let SalesOrderId=cmpcheck.nextsalesId;
    await newCompany.findOneAndUpdate({companyId: companyId}, {$set: {nextsalesId: cmpcheck.nextsalesId+1}})

    req.body.companyId=companyId;
    req.body.SalesOrderId=SalesOrderId
    const addsaleso=new salesOrder(req.body);
    await addsaleso.save();
     //Making entry in loogbook
     var currentdate=new Date();
     let statment="userId:"+employeeId+" created new sales order having SalesOrderId:"+SalesOrderId+" for "+req.body.salesDealer+" at "+currentdate.getDate() + "/"+ (currentdate.getMonth()+1)  + "/" + currentdate.getFullYear() + " @ "  + currentdate.getHours() + ":"  + currentdate.getMinutes() + ":" + currentdate.getSeconds();;
     await CmpLogADetailBook.findOneAndUpdate({companyId: companyId},{$push:{comment: [statment]}})
    
    res.send({success: "New Sales Order Created Successfully"});
})
//CASE 2: Add new sales product in sales order Endpoint
router.post("/addsalesorderproduct/:id", fetchuser, async (req, res)=>{
    const {companyId, employeeId}=req.details;
    let cmpcheck=await newCompany.findOne({companyId: companyId})
    if(!cmpcheck)
    {
        return res.status(400).send({error: "The company id does not exists"})
    }
    let spcheck=await salesOrder.findById(req.params.id)
    if(!spcheck)
    {
        return res.status(400).send({error: "The entered sales order num does not exists"})
    }
    else
    {
        let sopcheck=await salesOrderMini.findOne({companyId: companyId, SalesOrderId: spcheck.SalesOrderId, productId: req.body.productId});
        if(sopcheck)
        {
            return res.status(400).send({error: "The product that you are trying to add in the sales order already exists"})
        }
        else
        {
            //Now the main code for adding the new sales order's product
            req.body.companyId=companyId;
            req.body.SalesOrderId=spcheck.SalesOrderId;
            const salesProduct=new salesOrderMini(req.body);
            await salesProduct.save();
            
            //Code for changing the totalAmount in the SalesOrder
            let temp=spcheck.totalAmount+(req.body.quantity*req.body.perPicePrice);
            changeAmount=await salesOrder.findByIdAndUpdate(req.params.id, {$set:{totalAmount:temp}})

            //Making entry in loogbook
            var currentdate=new Date();
            let statment="UserId:"+employeeId+" added new product to salesOrder having SalesOrderId:"+spcheck.SalesOrderId+" having productId:"+req.body.productId+" at "+currentdate.getDate() + "/"+ (currentdate.getMonth()+1)  + "/" + currentdate.getFullYear() + " @ "  + currentdate.getHours() + ":"  + currentdate.getMinutes() + ":" + currentdate.getSeconds();;
            await CmpLogADetailBook.findOneAndUpdate({companyId: companyId},{$push:{comment: [statment]}})
            
            res.send({success: "New Product Added To Sales Order Successfully"});
        }
    }
})
//CASE 3: Delete Sales Order Endpoint, You have to also provide the document id, company id, sales order num
router.delete("/deleteorder/:id", fetchuser, async (req, res)=>{
    const {companyId, employeeId}=req.details;
    let orderidcheck=await salesOrder.findById(req.params.id);
    if(!orderidcheck)
    {
        return res.status(400).send({error: "The sales order does not exists"})
    }
    try
    {
        //Allow the order to delete if user and company owns this order
        sorder=await salesOrder.findByIdAndDelete(req.params.id)
        const {SalesOrderId}=sorder;
        await salesOrderMini.deleteMany({companyId: companyId, SalesOrderId: SalesOrderId})
        
        //Making entry in loogbook
        var currentdate=new Date();
        let statment="UserId:"+employeeId+" deleted sales order of SalesOrderId:"+SalesOrderId+" at "+currentdate.getDate() + "/"+ (currentdate.getMonth()+1)  + "/" + currentdate.getFullYear() + " @ "  + currentdate.getHours() + ":"  + currentdate.getMinutes() + ":" + currentdate.getSeconds();;
        await CmpLogADetailBook.findOneAndUpdate({companyId: companyId},{$push:{comment: [statment]}})
        
        return res.json({success: "sales order has been deleted"})
    }
    catch(error)
    {
        res.status(500).send({error: "Internal Server Error"});
    }
})

//CASE 4: Delete an prouct of the sales order Endpoint
router.delete("/deleteproduct/:id", fetchuser, async (req, res)=>{
    const {companyId, employeeId}=req.details;
    let deleteprod=await salesOrderMini.findById(req.params.id);
    if(!deleteprod)
    {
        return res.status(400).send({error: "The product does not exists in the sales order"});
    }
    orderProductCheck=await salesOrderMini.findByIdAndDelete(req.params.id);
    const {SalesOrderId, productId}=orderProductCheck
    
    //Code for changing the totalAmount in the salesOrder
    salesOrderDet=await salesOrder.findOne({companyId:companyId, SalesOrderId:deleteprod.SalesOrderId});
    let temp=salesOrderDet.totalAmount-(deleteprod.quantity*deleteprod.perPicePrice)
    await salesOrder.findOneAndUpdate({companyId:companyId, SalesOrderId:deleteprod.SalesOrderId}, {$set:{totalAmount: temp}})

    //Making entry in loogbook
    var currentdate=new Date();
    let statment="UserId:"+employeeId+" deleted Product having productId:"+productId+" from sales order having SalesOrderId:"+SalesOrderId+" at "+currentdate.getDate() + "/"+ (currentdate.getMonth()+1)  + "/" + currentdate.getFullYear() + " @ "  + currentdate.getHours() + ":"  + currentdate.getMinutes() + ":" + currentdate.getSeconds();;
    await CmpLogADetailBook.findOneAndUpdate({companyId: companyId},{$push:{comment: [statment]}})

    res.send({success: "The product of the sales order deleted"});
})

//CASE 5: Edit the sales order's Information Endpoint
router.put("/editsalesorder/:id", fetchuser, async (req, res)=>{
    const {companyId, employeeId}=req.details;
    const {salesDealer, brokerName, paymentTerm, comment, totalAmount, mainDispatchDate}=req.body;
    const updatedSales={};
    if(salesDealer){updatedSales.salesDealer=salesDealer};
    if(brokerName){updatedSales.brokerName=brokerName};
    if(paymentTerm){updatedSales.paymentTerm=paymentTerm};
    if(comment){updatedSales.comment=comment};
    if(totalAmount){updatedSales.totalAmount=totalAmount};
    if(mainDispatchDate){updatedSales.mainDispatchDate=mainDispatchDate};
    let sorder=await salesOrder.findById(req.params.id);
    if(!sorder)
    {
        return res.status(404).send({error: "The sales order does not found"});
    }
    if(sorder.companyId !=companyId)
    {
        return res.status(404).send({error: "Not Permited"});
    }
    sorder=await salesOrder.findByIdAndUpdate(req.params.id, {$set: updatedSales}, {new: true})
    
    //Making entry in loogbook
    var currentdate=new Date();
    let statment="UserId:"+employeeId+" edited sales order information having SalesOrderId:"+req.body.SalesOrderId+" at "+currentdate.getDate() + "/"+ (currentdate.getMonth()+1)  + "/" + currentdate.getFullYear() + " @ "  + currentdate.getHours() + ":"  + currentdate.getMinutes() + ":" + currentdate.getSeconds();;
    await CmpLogADetailBook.findOneAndUpdate({companyId: companyId},{$push:{comment: [statment]}})
    
    res.send({success: "Edition Of the Sales Order Successfull"})
})

//CASE 6: Edit the sales order's Product Information Endpoint
router.put("/editsalesproduct/:id", fetchuser, async (req, res)=>{
    const {companyId, employeeId}=req.details;
    const {productId, productName, quantity, perPicePrice, dispatchingFrom, dispatchDate, categoryId, categoryName}=req.body;
    const updatedProduct={};
    if(categoryId){updatedProduct.categoryId=categoryId};
    if(categoryName){updatedProduct.categoryName=categoryName};
    if(productId){updatedProduct.productId=productId};
    if(productName){updatedProduct.productName=productName};
    if(quantity){updatedProduct.quantity=quantity};
    if(perPicePrice){updatedProduct.perPicePrice=perPicePrice};
    if(dispatchingFrom){updatedProduct.dispatchingFrom=dispatchingFrom};
    if(dispatchDate){updatedProduct.dispatchDate=dispatchDate};
    let sproduct=await salesOrderMini.findById(req.params.id);
    if(!sproduct)
    {
        return res.status(404).send({error: "The sales product does not found"});
    }
    if(sproduct.companyId !=companyId)
    {
        return res.status(404).send({error: "Not Permited"});
    }
    let sproduct1=await salesOrderMini.findByIdAndUpdate(req.params.id, {$set: updatedProduct})
    
    //Code for changing the totalAmount in the salesOrder
    let salesDetail= await salesOrder.findOne({companyId: companyId, SalesOrderId: sproduct.SalesOrderId});
    let temp=salesDetail.totalAmount+(quantity*perPicePrice)-(sproduct.quantity*sproduct.perPicePrice);
    await salesOrder.findOneAndUpdate({companyId: companyId, SalesOrderId: sproduct.SalesOrderId}, {$set:{totalAmount:temp}})

    //Making entry in logbook
    var currentdate=new Date();
    let statment="UserId:"+employeeId+" edited details of product having productId:"+req.body.productId+" of sales order having SalesOrderId:"+sproduct.SalesOrderId+" at "+currentdate.getDate() + "/"+ (currentdate.getMonth()+1)  + "/" + currentdate.getFullYear() + " @ "  + currentdate.getHours() + ":"  + currentdate.getMinutes() + ":" + currentdate.getSeconds();;
    await CmpLogADetailBook.findOneAndUpdate({companyId: companyId},{$push:{comment: [statment]}})
    
    res.send({success: "Sales Product Information Edited Successfull"})
})

//CASE 7: Mangage Status Of Sales Order's product i.e. warehouse name or num, tobe planned, tobe ordered/produced, tobe packed, tobe shiped
router.put("/managestatus/:id", fetchuser, async (req, res)=>{
    const {companyId, employeeId}=req.details;
    temp=await salesOrderMini.findById(req.params.id)
    const {SalesOrderId, salesDealer, brokerName, productId, productName, quantity, perPicePrice, dispatchingFrom, dispatchDate, categoryId, categoryName}=temp;
    const updatedProduct={};
    if(companyId){updatedProduct.companyId=companyId};
    if(SalesOrderId){updatedProduct.SalesOrderId=SalesOrderId};
    if(categoryId){updatedProduct.salesDealer=categoryId};
    if(categoryName){updatedProduct.categoryName=categoryName};
    if(productId){updatedProduct.productId=productId};
    if(productName){updatedProduct.productName=productName};
    if(quantity){updatedProduct.quantity=quantity};
    if(perPicePrice){updatedProduct.perPicePrice=perPicePrice};
    if(dispatchingFrom){updatedProduct.dispatchingFrom=req.body.dispatchingFrom};
    if(dispatchDate){updatedProduct.dispatchDate=dispatchDate};
    let sproduct=await salesOrderMini.findById(req.params.id);
    if(!sproduct)
    {
        return res.status(404).send({error: "The sales product does not found"});
    }
    if(sproduct.companyId !=companyId)
    {
        return res.status(404).send({error: "Not Permited"});
    }
    sproduct=await salesOrderMini.findByIdAndUpdate(req.params.id, {$set: updatedProduct}, {new: true})
    
    //Making entry in logbook
    var currentdate=new Date();
    let statment="UserId:"+employeeId+" changed status of sales order's product having productId:"+productId+" of SalesOrderId:"+SalesOrderId+" at "+currentdate.getDate() + "/"+ (currentdate.getMonth()+1)  + "/" + currentdate.getFullYear() + " @ "  + currentdate.getHours() + ":"  + currentdate.getMinutes() + ":" + currentdate.getSeconds();;
    await CmpLogADetailBook.findOneAndUpdate({companyId: companyId},{$push:{comment: [statment]}})
    
    res.send({success: "Sales Order Manage successfull"})
})

//CASE 8: Dispatch Sales Order Endpoint, You have to also provide the document id, company id, sales order num
router.delete("/dispatchallorder/:id", fetchuser, async (req, res)=>{
    const {companyId, employeeId}=req.details;
    let orderidcheck=await salesOrder.findById(req.params.id);
    if(!orderidcheck)
    {
        return res.status(400).send({error: "The sales order does not exists OR have been already been dispatched"})
    }
    
    sorder=await salesOrder.findByIdAndDelete(req.params.id)
    socheck=await salesOrderMini.deleteMany({companyId: companyId, SalesOrderId: sorder.SalesOrderId})
    //After dispatching, Make entry in the sales histroy

    //Making entry in logbook
    var currentdate=new Date();
    let statment="UserId:"+employeeId+" dispatched sales order having salesorderId:"+sorder.SalesOrderId+" at "+currentdate.getDate() + "/"+ (currentdate.getMonth()+1)  + "/" + currentdate.getFullYear() + " @ "  + currentdate.getHours() + ":"  + currentdate.getMinutes() + ":" + currentdate.getSeconds();;
    await CmpLogADetailBook.findOneAndUpdate({companyId: companyId},{$push:{comment: [statment]}})
    
    return res.send({success: "sales order has been deleted"})
})

module.exports=router