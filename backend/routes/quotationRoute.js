const express=require("express");
const router=express.Router();
const {body, validationResult}=require("express-validator");
const newCompany=require("../models/Company_registry")
const quotation=require("../models/Quotation");
const quotationMini = require("../models/QuotationMini");
const SalesOrder = require("../models/SalesOrder");
const SalesOrderMini = require("../models/SalesOrderMini");

//CASE 1: Add new quotation Endpoint
router.get("/addquotation", async (req, res)=>{
    //Check wheather the quotation id exists if it does not exists than add one
    //Company Check
    let cmpcheck=await newCompany.findOne({companyId: req.body.companyId})
    if(!cmpcheck)
    {
        return res.status(400).findOne({error: "The company id does not exists"})
    }
    let qcheck=await quotation.findOne({companyId: req.body.companyId, quotationNum: req.body.quotationNum});
    if(qcheck)
    {
        return res.status(400).send({error: "The quotation Number Of Same Already Exists"});
    }
    else{
        const qout=new quotation(req.body);
        qout.save();
        res.send(req.body);
    }
})

//CASE 2: Add New Quotation Product To Quotation Endpoint
router.get("/addproduct", async (req, res)=>{
   //Check first the quotation id exists at the company Id or not
   let cmpCheck=await newCompany.findOne({companyId: req.body.companyId});
   if(!cmpCheck)
   {
      return res.status(400).send({error: "The Company Id Does Not Exists"});
   }
   let spcheck=await quotationMini.findOne({companyId: req.body.companyId, quotationNum: req.body.quotationNum, productId: req.body.productId});
   if(spcheck)
   {
      return res.status(400).send({error: "The Product Already Exists in the Quotation"})
   }
   else{
      //Main code for adding the product to the quotation
      const quotationadd=new quotationMini(req.body);
      quotationadd.save();
      res.send(quotationadd);
   }
})

//CASE 3:Edit Product Of Quotation Endpoint
router.get("/editproduct/:id", async (req, res)=>{
   //Check first the quotation id exists at the company Id or not
   let cmpCheck=await newCompany.findOne({companyId: req.body.companyId});
   if(!cmpCheck)
   {
      return res.status(400).send({error: "The Company Id Does Not Exists"});
   }
   let spcheck=await quotationMini.findOne({companyId: req.body.companyId, quotationNum: req.body.quotationNum, productId: req.body.productId});
   if(spcheck)
   {
      const {companyId, quotationNum, categoryId, categoryName, productId, productName, quantity, perPicePrice}=req.body;
      const updateProduct={};
      if(companyId){updateProduct.companyId=companyId};
      if(quotationNum){updateProduct.quotationNum=quotationNum};
      if(categoryId){updateProduct.categoryId=categoryId};
      if(categoryName){updateProduct.categoryName=categoryName};
      if(productId){updateProduct.productId=productId};
      if(productName){updateProduct.productName=productName};
      if(quantity){updateProduct.quantity=quantity};
      if(perPicePrice){updateProduct.perPicePrice=perPicePrice};
      //Find the Quotation's Product to be deleted and updated
      let qproduct=await quotationMini.findById(req.params.id);
      if(!qproduct)
      {
         return res.status(404).send("The Quotation Product Does Not Found");
      }
      if(qproduct.companyId !=req.body.companyId)
      {
         return res.status(404).send("Not Permited")
      }
      qupdate=await quotationMini.findByIdAndUpdate(req.params.id, {$set: updateProduct}, {new: true})
      res.json({qupdate});
   }
   else
   {
      return res.status(400).send({error: "The Product in the Given Quotation Number does not exists"})
   }
})

//CASE 4:Delete The Product Of Quotation Endpoint
router.delete("/deleteproduct/:id", async (req, res)=>{
   let deleteProd=await quotationMini.findById(req.params.id);
   if(!deleteProd)
   {
      return res.status(400).send({error: "The Product In the Quotation Does Not Exists"})
   }
   else{
      deleteProd=await quotationMini.findByIdAndDelete(req.params.id);
      res.send({success: "The Product Of Quotation Deleted"})
   }
})

//CASE 5:Delete Quotation Endpoint
router.delete("/deletequotation/:id", async (req, res)=>{
   let deletequotat=await quotation.findById(req.params.id);
   if(!deletequotat)
   {
      return res.status(400).send({error: "The Quotation Does Not Found"})
   }
   else
   {
      deletequotat=await quotation.findByIdAndDelete(req.params.id);
      res.send({success: "The Quotation Deleted"})
   }
})

//CASE 6:Add Quotation To Sales Order
router.get("/addtosales/:id", async (req, res)=>{
//Details to be added in the modal like dispatching status, dispatching date, broker name, payment term, comment
   //Data is tobe taken from quotation and quotationMini and be inserted in sales, salesMini
   let finalQuotation=await quotation.findById(req.params.id);
   if(!finalQuotation)
   {
      return res.status(404).send({error: "The given quotation does not exists"})
   }
   let Num=finalQuotation.quotationNum;
   const newSalesOrder={};
   const {companyId, quotationNum, dealer, totalAmount}=finalQuotation;
   const {SalesOrderNum, brokerName, paymentTerm, comment, mainDispatchDate}=req.body;
   if(companyId){newSalesOrder.companyId=companyId};
   if(SalesOrderNum){newSalesOrder.SalesOrderNum=SalesOrderNum};
   {newSalesOrder.salesDealer=dealer};
   if(brokerName){newSalesOrder.brokerName=brokerName};
   if(paymentTerm){newSalesOrder.paymentTerm=paymentTerm};
   if(comment){newSalesOrder.comment=comment};
   if(totalAmount){newSalesOrder.totalAmount=totalAmount};
   if(mainDispatchDate){newSalesOrder.mainDispatchDate=mainDispatchDate};
   //Find if the sales order exists, If exists than give the error
   //Adding And Deleting order of the sales and quotation
   let sorder=await SalesOrder.findOne({companyId: finalQuotation.companyId, SalesOrderNum: req.body.SalesOrderNum})
   if(sorder)
   {
      return res.status(404).send({error: "Such Order Number Exists, Enter an Unique Order Number"});
   }
   else{
      const newOrder=new SalesOrder(newSalesOrder);
      newOrder.save();
      quotation.findByIdAndDelete(req.params.id, function(err, docs){
         if(err){
            return res.status(404).send({error: err})
         }
      })
      //Adding And Deleting products of the sales and quotation
      let orderProducts;
      do{
         const newProduct={};
         orderProducts=await quotationMini.findOneAndDelete({companyId: finalQuotation.companyId, quotationNum: finalQuotation.quotationNum});
         if(orderProducts)
         {
            const {companyId, quotationNum, categoryId, categoryName, productId, productName, quantity, perPicePrice}=orderProducts;
            if(companyId){newProduct.companyId=companyId};
            if(SalesOrderNum){newProduct.SalesOrderNum=SalesOrderNum};
            if(categoryId){newProduct.categoryId=categoryId};
            if(categoryName){newProduct.categoryName=categoryName};
            if(productId){newProduct.productId=productId};
            if(productName){newProduct.productName=productName};
            if(quantity){newProduct.quantity=quantity};
            if(perPicePrice){newProduct.perPicePrice=perPicePrice};
            {newProduct.dispatchingFrom="tobe done"};
            {newProduct.dispatchDate="2022-08-11T21:49:55.616+00:00"};
         
         const newprodu=new SalesOrderMini(newProduct);
         newprodu.save();
         }
         ///////////////////////////////////////////
      }
      while(orderProducts);
      res.send(newOrder);
   }
   // res.send({success :totalAmount});
})
module.exports=router;