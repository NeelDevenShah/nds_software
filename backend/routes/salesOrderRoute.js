const express=require("express");
const router=express.Router();
const {body, validationResult}=require("express-validator");
const newCompany=require("../models/Company_registry");
const companyUser=require("../models/CompanyUser")
const salesOrder=require("../models/SalesOrder");
const salesOrderMini=require("../models/SalesOrderMini");

//CASE 1: Add new sales order Endpoint
router.get("/addneworder", async (req, res)=>{
    //Check wheather the sales order id exists if it does not exists than add one
    //Company check
    let cmpcheck=await newCompany.findOne({companyId: req.body.companyId})
    if(!cmpcheck)
    {
        return res.status(400).findOne({error: "The company id does not exists"})
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
        res.send(req.body);
    }
})
//CASE 2: Add new sales product in sales order Endpoint
router.get("/addsalesorderproduct", async (req, res)=>{
    //Check first the sales order num exists at the compId or not
    let cmpcheck=await newCompany.findOne({companyId: req.body.companyId})
    if(!cmpcheck)
    {
        return res.status(400).findOne({error: "The company id does not exists"})
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
        let socheck
        do{
        socheck=await salesOrderMini.findOneAndDelete({companyId: req.body.companyId, SalesOrderNum: req.body.SalesOrderNum})
        }
        while(socheck);
        return res.json({success: "sales order has been deleted"})
    }
    catch(error)
    {
        res.status(500).send("Internal Server Error");
    }
})

//CASE 4: Delete an prouct of the sales order Endpoint
router.delete("/deleteproduct/:id", async (req, res)=>{
    let deleteprod=orderProductCheck=await salesOrderMini.findById(req.params.id);
    if(!deleteprod)
    {
        return res.status(400).send({error: "The product does not exists in the sales order"});
    }
    orderProductCheck=await salesOrderMini.findByIdAndDelete(req.params.id);
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
    res.json({sorder})
})

//CASE 6: Edit the sales order's Product Information Endpoint
router.get("/editsalesproduct/:id", async (req, res)=>{
    const {companyId, SalesOrderNum, salesDealer, brokerName, productId, productName, quantity, perPicePrice, dispatchingFrom, dispatchDate}=req.body;
    const updatedProduct={};
    if(companyId){updatedProduct.companyId=companyId};
    if(SalesOrderNum){updatedProduct.SalesOrderNum=SalesOrderNum};
    if(salesDealer){updatedProduct.salesDealer=categoryId};
    if(brokerName){updatedProduct.categoryName=categoryName};
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
    res.json({sproduct})
})

//CASE 7: Mangage Status Of Sales Order i.e. warehouse name or num, tobe planned, tobe ordered/produced, tobe packed, tobe shiped
router.get("/managestatus/:id", async (req, res)=>{
    const {companyId, SalesOrderNum, salesDealer, brokerName, productId, productName, quantity, perPicePrice, dispatchingFrom, dispatchDate}=req.body;
    const updatedProduct={};
    if(companyId){updatedProduct.companyId=companyId};
    if(SalesOrderNum){updatedProduct.SalesOrderNum=SalesOrderNum};
    if(salesDealer){updatedProduct.salesDealer=categoryId};
    if(brokerName){updatedProduct.categoryName=categoryName};
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
    res.json({sproduct})
})
module.exports=router

//CASE 8: Dispatch Sales Order Endpoint, You have to also provide the document id, company id, sales order num
router.delete("/dispatchallorder/:id", async (req, res)=>{
    //Check first sales order num and the companyId exists
    let orderidcheck=await salesOrder.findById(req.params.id);
    if(!orderidcheck)
    {
        return res.status(400).send({error: "The sales order does not exists OR have been already been dispatched"})
    }
    //Find the sales Order and delete order and its products
    try
    {
        //Allow the order to delete if user and company owns this order
        sorder=await salesOrder.findByIdAndDelete(req.params.id)
        let socheck
        do{
        socheck=await salesOrderMini.findOneAndDelete({companyId: req.body.companyId, SalesOrderNum: req.body.SalesOrderNum})
        }
        while(socheck);
        return res.json({success: "sales order has been deleted"})
    }
    catch(error)
    {
        res.status(500).send("Internal Server Error");
    }
})