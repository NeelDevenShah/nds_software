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
    //Check wheather the sales order id exists if it does not exists than add one
    //Company check
    const {companyId, employeeId}=req.details;
    let cmpcheck=await newCompany.findOne({companyId: companyId})
    if(!cmpcheck)
    {
        return res.status(400).send({error: "The company id does not exists"})
    }
    let spcheck=await salesOrder.findOne({companyId: companyId, SalesOrderNum: req.body.SalesOrderNum});
    if(spcheck)
    {
        return res.status(400).send({error: "The sales order of the same id exists"});
    }
    else
    {
        req.body.companyId=companyId;
        const addsaleso=new salesOrder(req.body);
        await addsaleso.save();

         //Making entry in loogbook
         var currentdate=new Date();
         let statment="userId:"+employeeId+" created new sales order having salesOrderNum:"+req.body.SalesOrderNum+" for "+req.body.salesDealer+" at "+currentdate.getDate() + "/"+ (currentdate.getMonth()+1)  + "/" + currentdate.getFullYear() + " @ "  + currentdate.getHours() + ":"  + currentdate.getMinutes() + ":" + currentdate.getSeconds();;
         await CmpLogADetailBook.findOneAndUpdate({companyId: companyId},{$push:{comment: [statment]}})

        res.send({success: "New Sales Order Created Successfully"});
    }
})
//CASE 2: Add new sales product in sales order Endpoint
router.post("/addsalesorderproduct/:id", fetchuser, async (req, res)=>{
    //Check first the sales order num exists at the compId or not
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
        //Check wheather the product already does not exists in the saled order
        let sopcheck=await salesOrderMini.findOne({companyId: companyId, SalesOrderNum: spcheck.SalesOrderNum, productId: req.body.productId});
        if(sopcheck)
        {
            return res.status(400).send({error: "The product that you are trying to add in the sales order already exists"})
        }
        else
        {
            //Now the main code for adding the new sales order's product
            req.body.companyId=companyId;
            req.body.SalesOrderNum=spcheck.SalesOrderNum;
            const salesProduct=new salesOrderMini(req.body);
            await salesProduct.save();
            
            //Code for changing the totalAmount in the SalesOrder
            let temp=spcheck.totalAmount+(req.body.quantity*req.body.perPicePrice);
            changeAmount=await salesOrder.findByIdAndUpdate(req.params.id, {$set:{totalAmount:temp}})

            //Making entry in loogbook
            var currentdate=new Date();
            let statment="UserId:"+employeeId+" added new product to salesOrder having salesorderNum:"+spcheck.SalesOrderNum+" having productId:"+req.body.productId+" at "+currentdate.getDate() + "/"+ (currentdate.getMonth()+1)  + "/" + currentdate.getFullYear() + " @ "  + currentdate.getHours() + ":"  + currentdate.getMinutes() + ":" + currentdate.getSeconds();;
            await CmpLogADetailBook.findOneAndUpdate({companyId: companyId},{$push:{comment: [statment]}})
            
            res.send({success: "New Product Added To Sales Order Successfully"});
        }
    }
})
//CASE 3: Delete Sales Order Endpoint, You have to also provide the document id, company id, sales order num
router.delete("/deleteorder/:id", fetchuser, async (req, res)=>{
    //Check first sales order num and the companyId exists
    const {companyId, employeeId}=req.details;
    let orderidcheck=await salesOrder.findById(req.params.id);
    if(!orderidcheck)
    {
        return res.status(400).send({error: "The sales order does not exists"})
    }
    //Find the sales Order and delete order and its products
    try
    {
        //Allow the order to delete if user and company owns this order
        sorder=await salesOrder.findByIdAndDelete(req.params.id)
        const {SalesOrderNum}=sorder;
        await salesOrderMini.deleteMany({companyId: companyId, SalesOrderNum: SalesOrderNum})
        
        //Making entry in loogbook
        var currentdate=new Date();
        let statment="UserId:"+employeeId+" deleted sales order of salesorderNum:"+SalesOrderNum+" at "+currentdate.getDate() + "/"+ (currentdate.getMonth()+1)  + "/" + currentdate.getFullYear() + " @ "  + currentdate.getHours() + ":"  + currentdate.getMinutes() + ":" + currentdate.getSeconds();;
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
    const {SalesOrderNum, productId}=orderProductCheck
    
    //Code for changing the totalAmount in the salesOrder
    salesOrderDet=await salesOrder.findOne({companyId:companyId, SalesOrderNum:deleteprod.SalesOrderNum});
    let temp=salesOrderDet.totalAmount-(deleteprod.quantity*deleteprod.perPicePrice)
    await salesOrder.findOneAndUpdate({companyId:companyId, SalesOrderNum:deleteprod.SalesOrderNum}, {$set:{totalAmount: temp}})

    //Making entry in loogbook
    var currentdate=new Date();
    let statment="UserId:"+employeeId+" deleted Product having productId:"+productId+" from sales order having salesorderNum:"+SalesOrderNum+" at "+currentdate.getDate() + "/"+ (currentdate.getMonth()+1)  + "/" + currentdate.getFullYear() + " @ "  + currentdate.getHours() + ":"  + currentdate.getMinutes() + ":" + currentdate.getSeconds();;
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
    //Find the sales order to be deleted
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
    let statment="UserId:"+employeeId+" edited sales order information having SalesOrderId:"+req.body.SalesOrderNum+" at "+currentdate.getDate() + "/"+ (currentdate.getMonth()+1)  + "/" + currentdate.getFullYear() + " @ "  + currentdate.getHours() + ":"  + currentdate.getMinutes() + ":" + currentdate.getSeconds();;
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
    //Find the sales order to be deleted
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
    let salesDetail= await salesOrder.findOne({companyId: companyId, purchaseOrderNum: sproduct.purchaseOrderNum});
    let temp=salesDetail.totalAmount+(quantity*perPicePrice)-(sproduct.quantity*sproduct.perPicePrice);
    await salesOrder.findOneAndUpdate({companyId: companyId, SalesOrderNum: sproduct.SalesOrderNum}, {$set:{totalAmount:temp}})

    //Making entry in logbook
    var currentdate=new Date();
    let statment="UserId:"+employeeId+" edited details of product having productId:"+req.body.productId+" of sales order having salesorderNum:"+sproduct.SalesOrderNum+" at "+currentdate.getDate() + "/"+ (currentdate.getMonth()+1)  + "/" + currentdate.getFullYear() + " @ "  + currentdate.getHours() + ":"  + currentdate.getMinutes() + ":" + currentdate.getSeconds();;
    await CmpLogADetailBook.findOneAndUpdate({companyId: companyId},{$push:{comment: [statment]}})
    
    res.send({success: "Sales Product Information Edited Successfull"})
})

//CASE 7: Mangage Status Of Sales Order's product i.e. warehouse name or num, tobe planned, tobe ordered/produced, tobe packed, tobe shiped
router.put("/managestatus/:id", fetchuser, async (req, res)=>{
    const {companyId, employeeId}=req.details;
    temp=await salesOrderMini.findById(req.params.id)
    const {SalesOrderNum, salesDealer, brokerName, productId, productName, quantity, perPicePrice, dispatchingFrom, dispatchDate, categoryId, categoryName}=temp;
    const updatedProduct={};
    if(companyId){updatedProduct.companyId=companyId};
    if(SalesOrderNum){updatedProduct.SalesOrderNum=SalesOrderNum};
    if(categoryId){updatedProduct.salesDealer=categoryId};
    if(categoryName){updatedProduct.categoryName=categoryName};
    if(productId){updatedProduct.productId=productId};
    if(productName){updatedProduct.productName=productName};
    if(quantity){updatedProduct.quantity=quantity};
    if(perPicePrice){updatedProduct.perPicePrice=perPicePrice};
    if(dispatchingFrom){updatedProduct.dispatchingFrom=req.body.dispatchingFrom};
    if(dispatchDate){updatedProduct.dispatchDate=dispatchDate};
    //Find the sales order to be deleted
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
    let statment="UserId:"+employeeId+" changed status of sales order's product having productId:"+productId+" of salesOrderNum:"+SalesOrderNum+" at "+currentdate.getDate() + "/"+ (currentdate.getMonth()+1)  + "/" + currentdate.getFullYear() + " @ "  + currentdate.getHours() + ":"  + currentdate.getMinutes() + ":" + currentdate.getSeconds();;
    await CmpLogADetailBook.findOneAndUpdate({companyId: companyId},{$push:{comment: [statment]}})
    
    res.send({success: "Sales Order Manage successfull"})
})

//CASE 8: Dispatch Sales Order Endpoint, You have to also provide the document id, company id, sales order num
router.delete("/dispatchallorder/:id", fetchuser, async (req, res)=>{
    //Check first sales order num and the companyId exists
    const {companyId, employeeId}=req.details;
    let orderidcheck=await salesOrder.findById(req.params.id);
    if(!orderidcheck)
    {
        return res.status(400).send({error: "The sales order does not exists OR have been already been dispatched"})
    }
    //Find the sales Order and delete order and its products
    sorder=await salesOrder.findByIdAndDelete(req.params.id)
    socheck=await salesOrderMini.deleteMany({companyId: companyId, SalesOrderNum: sorder.SalesOrderNum})
    //After dispatching, Make entry in the sales histroy

    //Making entry in logbook
    var currentdate=new Date();
    let statment="UserId:"+employeeId+" dispatched sales order having salesorderId:"+sorder.SalesOrderNum+" at "+currentdate.getDate() + "/"+ (currentdate.getMonth()+1)  + "/" + currentdate.getFullYear() + " @ "  + currentdate.getHours() + ":"  + currentdate.getMinutes() + ":" + currentdate.getSeconds();;
    await CmpLogADetailBook.findOneAndUpdate({companyId: companyId},{$push:{comment: [statment]}})
    
    return res.send({success: "sales order has been deleted"})
})

module.exports=router