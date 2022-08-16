const express=require("express");
const router=express.Router();
const {body, validationResult}=require("express-validator");
const newCompany=require("../models/Company_registry");
const companyUser=require("../models/CompanyUser")
const salesOrder=require("../models/SalesOrder");
const salesOrderMini=require("../models/SalesOrderMini");
const CmpLogADetailBook=require("../models/CmpLogADetailBook")

//CASE 1: Add new sales order Endpoint
router.get("/addneworder", async (req, res)=>{
    //Check wheather the sales order id exists if it does not exists than add one
    //Company check
    let cmpcheck=await newCompany.findOne({companyId: req.body.companyId})
    if(!cmpcheck)
    {
        return res.status(400).send({error: "The company id does not exists"})
    }
    let spcheck=await salesOrder.findOne({companyId: req.body.companyId, SalesOrderNum: req.body.SalesOrderNum});
    if(spcheck)
    {
        return res.status(400).send({error: "The sales order of the same id exists"});
    }
    else
    {
        const addsaleso=new salesOrder(req.body);
        addsaleso.save();

         //Making entry in loogbook
         var currentdate=new Date();
         let statment="userId:"+req.body.employeeId+"created new sales order having salesOrderNum:"+req.body.SalesOrderNum+" for "+req.body.salesDealer+" at "+currentdate.getDate() + "/"+ (currentdate.getMonth()+1)  + "/" + currentdate.getFullYear() + " @ "  + currentdate.getHours() + ":"  + currentdate.getMinutes() + ":" + currentdate.getSeconds();;
         await CmpLogADetailBook.findOneAndUpdate({companyId: req.body.companyId},{$push:{comment: [statment]}})

        res.send(req.body);
    }
})
//CASE 2: Add new sales product in sales order Endpoint
router.get("/addsalesorderproduct", async (req, res)=>{
    //Check first the sales order num exists at the compId or not
    let cmpcheck=await newCompany.findOne({companyId: req.body.companyId})
    if(!cmpcheck)
    {
        return res.status(400).send({error: "The company id does not exists"})
    }
    let spcheck=await salesOrder.findOne({companyId: req.body.companyId, SalesOrderNum: req.body.SalesOrderNum})
    if(!spcheck)
    {
        return res.status(400).send({error: "The entered sales order num does not exists"})
    }
    else
    {
        //Check wheather the product already does not exists in the saled order
        let sopcheck=await salesOrderMini.findOne({companyId: req.body.companyId, SalesOrderNum: req.body.SalesOrderNum, productId: req.body.productId});
        if(sopcheck)
        {
            return res.status(400).send({error: "The product that you are trying to add in the sales order already exists"})
        }
        else
        {
            //Now the main code for adding the new sales order's product
            const salesProduct=new salesOrderMini(req.body);
            salesProduct.save();
            
            //Code for changing the totalAmount in the SalesOrder
            let temp=spcheck.totalAmount+(req.body.quantity*req.body.perPicePrice);
            changeAmount=await salesOrder.findOneAndUpdate({companyId: req.body.companyId, SalesOrderNum: req.body.SalesOrderNum}, {$set:{totalAmount:temp}})

            //Making entry in loogbook
            var currentdate=new Date();
            let statment="UserId:"+req.body.employeeId+"added new product to salesOrder having salesorderNum:"+req.body.SalesOrderNum+" having productId:"+req.body.productId+" at "+currentdate.getDate() + "/"+ (currentdate.getMonth()+1)  + "/" + currentdate.getFullYear() + " @ "  + currentdate.getHours() + ":"  + currentdate.getMinutes() + ":" + currentdate.getSeconds();;
            await CmpLogADetailBook.findOneAndUpdate({companyId: req.body.companyId},{$push:{comment: [statment]}})
            
            res.send(salesProduct);
        }
    }
})
//CASE 3: Delete Sales Order Endpoint, You have to also provide the document id, company id, sales order num
router.delete("/deleteorder/:id", async (req, res)=>{
    //Check first sales order num and the companyId exists
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
        const {companyId, SalesOrderNum}=sorder;
        await salesOrderMini.deleteMany({companyId: companyId, SalesOrderNum: SalesOrderNum})
        
        //Making entry in loogbook
        var currentdate=new Date();
        let statment="UserId:"+req.body.employeeId+" deleted sales order of salesorderNum:"+SalesOrderNum+" at "+currentdate.getDate() + "/"+ (currentdate.getMonth()+1)  + "/" + currentdate.getFullYear() + " @ "  + currentdate.getHours() + ":"  + currentdate.getMinutes() + ":" + currentdate.getSeconds();;
        await CmpLogADetailBook.findOneAndUpdate({companyId: companyId},{$push:{comment: [statment]}})
        
        return res.json({success: "sales order has been deleted"})
    }
    catch(error)
    {
        res.status(500).send("Internal Server Error");
    }
})

//CASE 4: Delete an prouct of the sales order Endpoint
router.delete("/deleteproduct/:id", async (req, res)=>{
    let deleteprod=await salesOrderMini.findById(req.params.id);
    if(!deleteprod)
    {
        return res.status(400).send({error: "The product does not exists in the sales order"});
    }
    orderProductCheck=await salesOrderMini.findByIdAndDelete(req.params.id);
    const {companyId, SalesOrderNum, productId}=orderProductCheck
    
    //Code for changing the totalAmount in the salesOrder
    salesOrderDet=await salesOrder.findOne({companyId:deleteprod.companyId, SalesOrderNum:deleteprod.SalesOrderNum});
    let temp=salesOrderDet.totalAmount-(deleteprod.quantity*deleteprod.perPicePrice)
    await salesOrder.findOneAndUpdate({companyId:deleteprod.companyId, SalesOrderNum:deleteprod.SalesOrderNum}, {$set:{totalAmount: temp}})

    //Making entry in loogbook
    var currentdate=new Date();
    let statment="UserId:"+req.body.employeeId+" deleted Product having productId:"+productId+" from sales order having salesorderNum:"+SalesOrderNum+" at "+currentdate.getDate() + "/"+ (currentdate.getMonth()+1)  + "/" + currentdate.getFullYear() + " @ "  + currentdate.getHours() + ":"  + currentdate.getMinutes() + ":" + currentdate.getSeconds();;
    await CmpLogADetailBook.findOneAndUpdate({companyId: companyId},{$push:{comment: [statment]}})

    res.send({success: "The product of the sales order deleted"});
})

//CASE 5: Edit the sales order's Information Endpoint
router.get("/editsalesorder/:id", async (req, res)=>{
    const {companyId, SalesOrderNum, salesDealer, brokerName, paymentTerm, comment, totalAmount, mainDispatchDate}=req.body;
    const updatedSales={};
    if(companyId){updatedSales.companyId=companyId};
    if(SalesOrderNum){updatedSales.SalesOrderNum=SalesOrderNum};
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
        return res.status(404).send("The sales order does not found");
    }
    if(sorder.companyId !=req.body.companyId)
    {
        return res.status(404).send("Not Permited");
    }
    sorder=await salesOrder.findByIdAndUpdate(req.params.id, {$set: updatedSales}, {new: true})
    
    //Making entry in loogbook
    var currentdate=new Date();
    let statment="UserId:"+req.body.employeeId+"edited sales order information having SalesOrderId:"+req.body.SalesOrderNum+" at "+currentdate.getDate() + "/"+ (currentdate.getMonth()+1)  + "/" + currentdate.getFullYear() + " @ "  + currentdate.getHours() + ":"  + currentdate.getMinutes() + ":" + currentdate.getSeconds();;
    await CmpLogADetailBook.findOneAndUpdate({companyId: req.body.companyId},{$push:{comment: [statment]}})
    
    res.json({sorder})
})

//CASE 6: Edit the sales order's Product Information Endpoint
router.get("/editsalesproduct/:id", async (req, res)=>{
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
        return res.status(404).send("The sales product does not found");
    }
    if(sproduct.companyId !=req.body.companyId)
    {
        return res.status(404).send("Not Permited");
    }
    let sproduct1=await salesOrderMini.findByIdAndUpdate(req.params.id, {$set: updatedProduct})
    
    //Code for changing the totalAmount in the salesOrder
    let salesDetail= await salesOrder.findOne({companyId: sproduct.companyId, purchaseOrderNum: sproduct.purchaseOrderNum});
    let temp=salesDetail.totalAmount+(quantity*perPicePrice)-(sproduct.quantity*sproduct.perPicePrice);
    await salesOrder.findOneAndUpdate({companyId: sproduct.companyId, SalesOrderNum: sproduct.SalesOrderNum}, {$set:{totalAmount:temp}})

    //Making entry in logbook
    var currentdate=new Date();
    let statment="UserId:"+req.body.employeeId+" edited details of product having productId:"+req.body.productId+" of sales order having salesorderNum:"+sproduct.SalesOrderNum+" at "+currentdate.getDate() + "/"+ (currentdate.getMonth()+1)  + "/" + currentdate.getFullYear() + " @ "  + currentdate.getHours() + ":"  + currentdate.getMinutes() + ":" + currentdate.getSeconds();;
    await CmpLogADetailBook.findOneAndUpdate({companyId: sproduct.companyId},{$push:{comment: [statment]}})
    
    res.json({sproduct1})
})

//CASE 7: Mangage Status Of Sales Order's product i.e. warehouse name or num, tobe planned, tobe ordered/produced, tobe packed, tobe shiped
router.get("/managestatus/:id", async (req, res)=>{
    temp=await salesOrderMini.findById(req.params.id)
    const {companyId, SalesOrderNum, salesDealer, brokerName, productId, productName, quantity, perPicePrice, dispatchingFrom, dispatchDate, categoryId, categoryName}=temp;
    const updatedProduct={};
    if(companyId){updatedProduct.companyId=companyId};
    if(SalesOrderNum){updatedProduct.SalesOrderNum=SalesOrderNum};
    if(categoryId){updatedProduct.salesDealer=categoryId};
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
        return res.status(404).send("The sales product does not found");
    }
    if(sproduct.companyId !=req.body.companyId)
    {
        return res.status(404).send("Not Permited");
    }
    sproduct=await salesOrderMini.findByIdAndUpdate(req.params.id, {$set: updatedProduct}, {new: true})
    
    //Making entry in logbook
    var currentdate=new Date();
    let statment=+"UserId:"+req.body.employeeId+" changed status of sales order's product having productId:"+productId+" of salesOrderNum:"+SalesOrderNum+" at "+currentdate.getDate() + "/"+ (currentdate.getMonth()+1)  + "/" + currentdate.getFullYear() + " @ "  + currentdate.getHours() + ":"  + currentdate.getMinutes() + ":" + currentdate.getSeconds();;
    await CmpLogADetailBook.findOneAndUpdate({companyId: companyId},{$push:{comment: [statment]}})
    
    res.json({sproduct})
})

//CASE 8: Dispatch Sales Order Endpoint, You have to also provide the document id, company id, sales order num
router.delete("/dispatchallorder/:id", async (req, res)=>{
    //Check first sales order num and the companyId exists
    let orderidcheck=await salesOrder.findById(req.params.id);
    if(!orderidcheck)
    {
        return res.status(400).send({error: "The sales order does not exists OR have been already been dispatched"})
    }
    //Find the sales Order and delete order and its products
    sorder=await salesOrder.findByIdAndDelete(req.params.id)
    socheck=await salesOrderMini.deleteMany({companyId: sorder.companyId, SalesOrderNum: sorder.SalesOrderNum})
    
    //Making entry in logbook
    var currentdate=new Date();
    let statment="UserId:"+req.body.employeeId+" dispatched sales order having salesorderId:"+sorder.SalesOrderNum+" at "+currentdate.getDate() + "/"+ (currentdate.getMonth()+1)  + "/" + currentdate.getFullYear() + " @ "  + currentdate.getHours() + ":"  + currentdate.getMinutes() + ":" + currentdate.getSeconds();;
    await CmpLogADetailBook.findOneAndUpdate({companyId: sorder.companyId},{$push:{comment: [statment]}})
    
    return res.json({success: "sales order has been deleted"})
})

module.exports=router