const express=require("express");
const router=express.Router();
const {body, validationResult}=require("express-validator");
const newCompany=require("../models/Company_registry");
const companyUser=require("../models/CompanyUser");
const purchaseOrder=require("../models/PurchaseOrder");
// const salesOrder=require("../models/SalesOrder");
// const salesOrderMini=require("../models/SalesOrderMini");
const purchaseOrderMini=require("../models/PurchaseOrderMini");

//CASE 1: Add new purchase order Endpoint
router.get("/addneworder", async (req, res)=>{
    //Check wheather the sales order id exists if it does not exists than add one
    //Company check
    let cmpcheck=await newCompany.findOne({companyId: req.body.companyId})
    if(!cmpcheck)
    {
        return res.status(400).send({error: "The company id does not exists"})
    }
    let spcheck=await purchaseOrder.findOne({companyId: req.body.companyId, purchaseOrderNum: req.body.purchaseOrderNum});
    if(spcheck)
    {
        return res.status(400).send({error: "The purchase order of the same id exists"});
    }
    else
    {
        const addpurchaseo=new purchaseOrder(req.body);
        addpurchaseo.save();
        res.send(req.body);
    }
})
//CASE 2: Add new purchase product in purchase order Endpoint
router.get("/addpurchaseproduct", async (req, res)=>{
    //Check first the purchase order num exists at the compId or not
    let cmpcheck=await newCompany.findOne({companyId: req.body.companyId})
    if(!cmpcheck)
    {
        return res.status(400).send({error: "The company id does not exists"})
    }
    let spcheck=await purchaseOrder.findOne({companyId: req.body.companyId, purchaseOrderNum: req.body.purchaseOrderNum})
    if(!spcheck)
    {
        return res.status(400).send({error: "The entered purchase order num does not exists"})
    }
    else
    {
        //Check wheather the product already does not exists in the purchase order
        let sopcheck=await purchaseOrderMini.findOne({companyId: req.body.companyId, purchaseOrderNum: req.body.purchaseOrderNum, productId: req.body.productId});
        if(sopcheck)
        {
            return res.status(400).send({error: "The product that you are trying to add in the purchase order already exists"})
        }
        else
        {
            //Now the main code for adding the new sales order's product
            const purchaseProduct=new purchaseOrderMini(req.body);
            purchaseProduct.save();
            res.send(purchaseProduct);
        }
    }
})
//CASE 3: Delete Purchase Order Endpoint, You have to also provide the document id, company id, purchase order num
router.delete("/deleteorder/:id", async (req, res)=>{
    //Check first purchase order num and the companyId exists
    let orderidcheck=await purchaseOrder.findById(req.params.id);
    if(!orderidcheck)
    {
        return res.status(400).send({error: "The purchase order does not exists"})
    }
    //Find the purchase Order and delete order and its products
    try
    {
        //Allow the order to delete if user and company owns this order
        sorder=await purchaseOrder.findByIdAndDelete(req.params.id)
        let socheck
        do{
        socheck=await purchaseOrderMini.findOneAndDelete({companyId: req.body.companyId, purchaseOrderNum: req.body.purchaseOrderNum})
        }
        while(socheck);
        return res.json({success: "purchase order has been deleted"})
    }
    catch(error)
    {
        res.status(500).send("Internal Server Error");
    }
})

//CASE 4: Delete an prouct of the purchase order Endpoint
router.delete("/deleteproduct/:id", async (req, res)=>{
    let deleteprod=await purchaseOrderMini.findById(req.params.id);
    if(!deleteprod)
    {
        return res.status(400).send({error: "The product does not exists in the sales order"});
    }
    deleteprod=await purchaseOrderMini.findByIdAndDelete(req.params.id);
    res.send({success: "The product of the purchase order deleted"});
})

//CASE 5: Edit the sales order's Information Endpoint
router.get("/editpurchaseorder/:id", async (req, res)=>{
    const {companyId, purchaseOrderNum, purchaseDealer, brokerName, paymentTerm, comment, totalAmount, mainArrivingDate}=req.body;
    const updatedPurchase={};
    if(companyId){updatedPurchase.companyId=companyId};
    if(purchaseOrderNum){updatedPurchase.SalesOrderNum=purchaseOrderNum};
    if(purchaseDealer){updatedPurchase.salesDealer=purchaseDealer};
    if(brokerName){updatedPurchase.brokerName=brokerName};
    if(paymentTerm){updatedPurchase.paymentTerm=paymentTerm};
    if(comment){updatedPurchase.comment=comment};
    if(totalAmount){updatedPurchase.totalAmount=totalAmount};
    if(purchaseDealer){updatedPurchase.mainDispatchDate=purchaseDealer};
    //Find the purchase order to be deleted
    let porder=await purchaseOrder.findById(req.params.id);
    if(!porder)
    {
        return res.status(404).send("The purchase order does not found");
    }
    if(porder.companyId !=req.body.companyId)
    {
        return res.status(404).send("Not Permited");
    }
    porder=await purchaseOrder.findByIdAndUpdate(req.params.id, {$set: updatedPurchase}, {new: true})
    res.json({porder})
})

//CASE 6: Edit the purchase order's Product Information Endpoint
router.get("/editpurchaseproduct/:id", async (req, res)=>{
    const {companyId, purchaseOrderNum, categoryId, categoryName, productId, productName, quantity, perPicePrice, status,arrivingat, arrivingDate}=req.body;
    const updatedProduct={};
    if(companyId){updatedProduct.companyId=companyId};
    if(purchaseOrderNum){updatedProduct.purchaseOrderNum=purchaseOrderNum};
    if(categoryId){updatedProduct.categoryId=categoryId};
    if(categoryName){updatedProduct.categoryName=categoryName};
    if(productId){updatedProduct.productId=productId};
    if(productName){updatedProduct.productName=productName};
    if(quantity){updatedProduct.quantity=quantity};
    if(perPicePrice){updatedProduct.perPicePrice=perPicePrice};
    if(status){updatedProduct.status=status};
    if(arrivingat){updatedProduct.arrivingat=arrivingat};
    if(arrivingDate){updatedProduct.arrivingDate=arrivingDate};
    //Find the sales order to be deleted
    let sproduct=await purchaseOrderMini.findById(req.params.id);
    if(!sproduct)
    {
        return res.status(404).send("The purchase product does not found");
    }
    if(sproduct.companyId !=req.body.companyId)
    {
        return res.status(404).send("Not Permited");
    }
    sproduct=await purchaseOrderMini.findByIdAndUpdate(req.params.id, {$set: updatedProduct}, {new: true})
    res.json({sproduct})
})

//CASE 7: Mangage Status Of Purchase Order Product i.e. warehouse name or num, tobe planned, tobe ordered/produced, tobe packed, tobe shiped
router.get("/managestatus/:id", async (req, res)=>{
    const {companyId, purchaseOrderNum, categoryId, categoryName, productId, productName, quantity, perPicePrice, status, arrivingat, arrivingDate}=req.body;
    const updatedProduct={};
    if(companyId){updatedProduct.companyId=companyId};
    if(purchaseOrderNum){updatedProduct.purchaseOrderNum=purchaseOrderNum};
    if(categoryId){updatedProduct.categoryId=categoryId};
    if(categoryName){updatedProduct.categoryName=categoryName};
    if(productId){updatedProduct.productId=productId};
    if(productName){updatedProduct.productName=productName};
    if(quantity){updatedProduct.quantity=quantity};
    if(perPicePrice){updatedProduct.perPicePrice=perPicePrice};
    if(status){updatedProduct.status=status};
    if(arrivingat){updatedProduct.arrivingat=arrivingat};
    if(arrivingDate){updatedProduct.arrivingDate=arrivingDate};
    //Find the sales order to be deleted
    let sproduct=await purchaseOrderMini.findById(req.params.id);
    if(!sproduct)
    {
        return res.status(404).send("The purchase product does not found");
    }
    if(sproduct.companyId !=req.body.companyId)
    {
        return res.status(404).send("Not Permited");
    }
    sproduct=await purchaseOrderMini.findByIdAndUpdate(req.params.id, {$set: updatedProduct}, {new: true})
    res.json({sproduct})
})

//CASE 8: Dispatch Sales Order Endpoint, You have to also provide the document id, company id, sales order num
router.delete("/dispatchallorder/:id", async (req, res)=>{
    //Check first purchase order num and the companyId exists
    let orderidcheck=await purchaseOrder.findById(req.params.id);
    if(!orderidcheck)
    {
        return res.status(400).send({error: "The purchase order does not exists OR have been already been dispatched"})
    }
    //Find the purchase Order and delete order and its products
    try
    {
        //Allow the order to delete if user and company owns this order
        sorder=await purchaseOrder.findByIdAndDelete(req.params.id)
        let socheck
        do{
        socheck=await purchaseOrderMini.findOneAndDelete({companyId: req.body.companyId, purchaseOrderNum: req.body.purchaseOrderNum})
        }
        while(socheck);
        return res.json({success: "purchase order has been deleted"})
    }
    catch(error)
    {
        res.status(500).send("Internal Server Error");
    }
})

module.exports=router