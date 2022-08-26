const express=require("express");
const router=express.Router();
const {body, validationResult}=require("express-validator");
const newCompany=require("../models/Company_registry")
const quotation=require("../models/Quotation");
const quotationMini = require("../models/QuotationMini");
const SalesOrder = require("../models/SalesOrder");
const SalesOrderMini = require("../models/SalesOrderMini");
const CmpLogADetailBook=require("../models/CmpLogADetailBook")
const fetchuser=require("../middleware/fetchuser")
const fetchcompany=require("../middleware/fetchcompany");

//CASE 1: Add new quotation Endpoint
router.post("/addquotation", fetchuser, async (req, res)=>{
    const {companyId, employeeId}=req.details;
    let cmpcheck=await newCompany.findOne({companyId: companyId})
    if(!cmpcheck)
    {
        return res.send({error: "The company id does not exists"})
    }
   //  let qcheck=await quotation.findOne({companyId: companyId, quotationId: req.body.quotationId});
   //  if(qcheck)
   //  {
   //      return res.send({error: "The quotation Number Of Same Already Exists"});
   //  }
   //  else{
   let quotationId=cmpcheck.nextquotationId;
   await newCompany.findOneAndUpdate({companyId: companyId}, {$set: {nextquotationId: cmpcheck.nextquotationId+1}})

   req.body.quotationId=quotationId;
   req.body.companyId=companyId;
   const qout=new quotation(req.body);
   await qout.save();
   //Making entry in logbook
   var currentdate=new Date();
   let statment="UserId:"+employeeId+" created new quotation having quotationId:"+quotationId+" for "+req.body.dealer+" at "+currentdate.getDate() + "/"+ (currentdate.getMonth()+1)  + "/" + currentdate.getFullYear() + " @ "  + currentdate.getHours() + ":"  + currentdate.getMinutes() + ":" + currentdate.getSeconds();
   await CmpLogADetailBook.findOneAndUpdate({companyId: companyId},{$push:{comment: [statment]}})
   res.send({success: "success"});
   //  }
})

//CASE 2: Add New Quotation Product To Quotation Endpoint
router.post("/addproduct/:id", fetchuser, async (req, res)=>{
   const {companyId, employeeId}=req.details;
   let cmpCheck=await newCompany.findOne({companyId: companyId});
   if(!cmpCheck)
   {
      return res.send({error: "The Company Id Does Not Exists"});
   }
   else{
      //Main code for adding the product to the quotation
      QuotationDetail= await quotation.findById(req.params.id);
      if(!QuotationDetail)
      {
         return res.send({error: "The Quotation Num does not exists, PLease enter right id"})
      }
      let spcheck=await quotationMini.findOne({companyId: companyId, quotationId: QuotationDetail.quotationId, productId: req.body.productId});
      if(spcheck)
      {
         return res.send({error: "The Product Already Exists in the Quotation"})
      }
      req.body.companyId=companyId;
      req.body.quotationId=QuotationDetail.quotationId;
      const quotationadd=new quotationMini(req.body);
      await quotationadd.save();

      //Update the totalAmount in the quotationDetail
      let temp=QuotationDetail.totalAmount+(req.body.quantity*req.body.perPicePrice);
      await quotation.findByIdAndUpdate(req.params.id, {$set:{totalAmount:temp}})
      
      //Making entry in logbook
      var currentdate=new Date();
      let statment="UserId:"+employeeId+" added new quotation product having productId:"+req.body.productId+" in the quotationId:"+QuotationDetail.quotationId+" at "+currentdate.getDate() + "/"+ (currentdate.getMonth()+1)  + "/" + currentdate.getFullYear() + " @ "  + currentdate.getHours() + ":"  + currentdate.getMinutes() + ":" + currentdate.getSeconds();
      await CmpLogADetailBook.findOneAndUpdate({companyId: companyId},{$push:{comment: [statment]}})
      
      res.send({success: "success"});
   }
})

//CASE 3:Edit Product Of Quotation Endpoint
router.put("/editproduct/:id", fetchuser, async (req, res)=>{
   const {companyId, employeeId}=req.details;
   let cmpCheck=await newCompany.findOne({companyId: companyId});
   if(!cmpCheck)
   {
      return res.send({error: "The Company Id Does Not Exists"});
   }
   let spcheck=await quotationMini.findById(req.params.id)
   if(spcheck)
   {
      const {quotationId}=spcheck;
      const {quantity, perPicePrice}=req.body;
      if(quantity=="" || perPicePrice=="")
      {
         return res.send({error: "enter right values"})
      }
      qupdate=await quotationMini.findByIdAndUpdate(req.params.id, {$set: {quantity: quantity, perPicePrice: perPicePrice}})
      
      //Making change in the qutation's total Amount
      QuotationDetail= await quotation.findOne({companyId: companyId, quotationId: quotationId});
      let temp=QuotationDetail.totalAmount+(quantity*perPicePrice)-(spcheck.quantity*spcheck.perPicePrice);
      await quotation.findOneAndUpdate({companyId: companyId, quotationId: quotationId}, {$set:{totalAmount:temp}})

      //Making entry in logbook
      var currentdate=new Date();
      let statment="UserId:"+employeeId+" edited quotation product having productId:"+spcheck.productId+" in quotationId:"+quotationId+" at "+currentdate.getDate() + "/"+ (currentdate.getMonth()+1)  + "/" + currentdate.getFullYear() + " @ "  + currentdate.getHours() + ":"  + currentdate.getMinutes() + ":" + currentdate.getSeconds();
      await CmpLogADetailBook.findOneAndUpdate({companyId: companyId},{$push:{comment: [statment]}})

      res.send({success: "success"});
   }
   else
   {
      return res.send({error: "The Product in the Given Quotation Number does not exists"})
   }
})

//CASE 4:Delete The Product Of Quotation Endpoint
router.delete("/deleteproduct/:id", fetchuser, async (req, res)=>{
   const {companyId, employeeId}=req.details;
   let deleteProd=await quotationMini.findById(req.params.id);
   const {quotationId}=deleteProd;
   if(!deleteProd)
   {
      return res.send({error: "The Product In the Quotation Does Not Exists"})
   }
   else{
      deleteProd=await quotationMini.findByIdAndDelete(req.params.id);
      
      //Updating the totalAmount of the quotation
      QuotationDetail= await quotation.findOne({companyId: companyId, quotationId: quotationId});
      let temp=QuotationDetail.totalAmount-(deleteProd.quantity*deleteProd.perPicePrice);
      await quotation.findOneAndUpdate({companyId: companyId, quotationId: quotationId}, {$set:{totalAmount:temp}})

      //Making entry in logbook
      var currentdate=new Date();
      let statment="UserId:"+employeeId+" deleted quotation product having productId:"+deleteProd.productId+" in quotationId:"+deleteProd.quotationId+" at "+currentdate.getDate() + "/"+ (currentdate.getMonth()+1)  + "/" + currentdate.getFullYear() + " @ "  + currentdate.getHours() + ":"  + currentdate.getMinutes() + ":" + currentdate.getSeconds();
      await CmpLogADetailBook.findOneAndUpdate({companyId: companyId},{$push:{comment: [statment]}})

      res.send({success: "success"})
   }
})

//CASE 5:Delete Quotation Endpoint
router.delete("/deletequotation/:id", fetchuser, async (req, res)=>{
   const {companyId, employeeId}=req.details;
   let deletequotat=await quotation.findById(req.params.id);
   if(!deletequotat)
   {
      return res.send({error: "The Quotation Does Not Found"})
   }
   else
   {
      deletequotat=await quotation.findByIdAndDelete(req.params.id);
      await quotationMini.deleteMany({companyId: companyId, quotationId:deletequotat.quotationId})

      //Making entry in logbook
      var currentdate=new Date();
      let statment="UserId:"+employeeId+" deleted quotation having quotationId:"+deletequotat.quotationId+" at "+currentdate.getDate() + "/"+ (currentdate.getMonth()+1)  + "/" + currentdate.getFullYear() + " @ "  + currentdate.getHours() + ":"  + currentdate.getMinutes() + ":" + currentdate.getSeconds();
      await CmpLogADetailBook.findOneAndUpdate({companyId: companyId},{$push:{comment: [statment]}})
      
      res.send({success: "success"})
   }
})

//CASE 6:Add Quotation To Sales Order
router.post("/addtosales/:id", fetchuser, async (req, res)=>{
  //Data is tobe taken from quotation and quotationMini and be inserted in sales, salesMini
  const {companyId, employeeId}=req.details;
   let cmpCheck=await newCompany.findOne({companyId: companyId});
   if(!cmpCheck)
   {
      return res.send({error: "The Company Id Does Not Exists"});
   }
   let finalQuotation=await quotation.findById(req.params.id);
   if(!finalQuotation)
   {
      return res.send({error: "The given quotation does not exists"})
   }
   
   // let Num=finalQuotation.quotationId;
   const {quotationId, dealer, totalAmount}=finalQuotation;
   const {brokerName, paymentTerm, comment, mainDispatchDate}=req.body;

   let SalesOrderId=cmpCheck.nextsalesId;
   await newCompany.findOneAndUpdate({companyId: companyId}, {$set: {nextsalesId: cmpCheck.nextsalesId+1}});

   const newSalesOrder={};
   if(companyId){newSalesOrder.companyId=companyId};
   {newSalesOrder.SalesOrderId=SalesOrderId};
   {newSalesOrder.salesDealer=dealer};
   if(brokerName){newSalesOrder.brokerName=brokerName};
   if(paymentTerm){newSalesOrder.paymentTerm=paymentTerm};
   if(comment){newSalesOrder.comment=comment};
   if(totalAmount){newSalesOrder.totalAmount=totalAmount};
   if(mainDispatchDate){newSalesOrder.mainDispatchDate=mainDispatchDate};
   //Find if the sales order exists, If exists than give the error
   //Adding And Deleting order of the sales and quotation
   let sorder=await SalesOrder.findOne({companyId: companyId, SalesOrderId: req.body.SalesOrderId})
   if(sorder)
   {
      return res.send({error: "Such Order Number Exists, Enter an Unique Order Number"});
   }
   else{
      const newOrder=new SalesOrder(newSalesOrder);
      await newOrder.save();
      let quotation1=await quotation.findByIdAndDelete(req.params.id)
      //Adding And Deleting products of the sales and quotation
      let orderProducts;
      do{
         const newProduct={};
         orderProducts=await quotationMini.findOneAndDelete({companyId: companyId, quotationId: finalQuotation.quotationId});
         if(orderProducts)
         {
            const {categoryId, categoryName, productId, productName, quantity, perPicePrice}=orderProducts;
            {newProduct.companyId=companyId};
            {newProduct.SalesOrderId=SalesOrderId};
            {newProduct.categoryId=categoryId};
            {newProduct.categoryName=categoryName};
            {newProduct.productId=productId};
            {newProduct.productName=productName};
            {newProduct.quantity=quantity};
            {newProduct.perPicePrice=perPicePrice};
            //Here the -1 indicates the product is meant tobe added
            {newProduct.dispatchingFrom="-1"};
            {newProduct.dispatchDate="2022-08-11T21:49:55.616+00:00"};
         
         const newprodu=new SalesOrderMini(newProduct);
         await newprodu.save();
         }
      }
      while(orderProducts);

      //Making entry in logbook
      var currentdate=new Date();
      let statment="UserId:"+employeeId+" transfered the quotationId:"+quotation1.quotationId+" to sales order having salesOrderId:"+SalesOrderId+" at "+currentdate.getDate() + "/"+ (currentdate.getMonth()+1)  + "/" + currentdate.getFullYear() + " @ "  + currentdate.getHours() + ":"  + currentdate.getMinutes() + ":" + currentdate.getSeconds();
      await CmpLogADetailBook.findOneAndUpdate({companyId: companyId},{$push:{comment: [statment]}})

      res.send({success: "success"});
   }
})

//CASE 7:Get the details of the product at the given id
router.get("/getproductdetailsbyid/:id", fetchuser, async (req, res)=>{
   const {companyId}=req.details;
   let quotationDetail=await quotationMini.findById(req.params.id);
   res.send(quotationDetail);
}) 
module.exports=router;