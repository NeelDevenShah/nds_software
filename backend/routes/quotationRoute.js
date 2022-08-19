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
    //Check wheather the quotation id exists if it does not exists than add one
    //Company Check
    const {companyId, employeeId}=req.details;
    let cmpcheck=await newCompany.findOne({companyId: companyId})
    if(!cmpcheck)
    {
        return res.status(400).findOne({error: "The company id does not exists"})
    }
    let qcheck=await quotation.findOne({companyId: companyId, quotationNum: req.body.quotationNum});
    if(qcheck)
    {
        return res.status(400).send({error: "The quotation Number Of Same Already Exists"});
    }
    else{
         req.body.companyId=companyId;
         const qout=new quotation(req.body);
         await qout.save();

         //Making entry in logbook
         var currentdate=new Date();
         let statment="UserId:"+employeeId+" created new quotation having quotationNum:"+req.body.quotationNum+" for "+req.body.dealer+" at "+currentdate.getDate() + "/"+ (currentdate.getMonth()+1)  + "/" + currentdate.getFullYear() + " @ "  + currentdate.getHours() + ":"  + currentdate.getMinutes() + ":" + currentdate.getSeconds();
         await CmpLogADetailBook.findOneAndUpdate({companyId: companyId},{$push:{comment: [statment]}})

        res.send({success: "New Quotation Added Successfull"});
    }
})

//CASE 2: Add New Quotation Product To Quotation Endpoint
router.post("/addproduct/:id", fetchuser, async (req, res)=>{
   //Check first the quotation id exists at the company Id or not
   const {companyId, employeeId}=req.details;
   let cmpCheck=await newCompany.findOne({companyId: companyId});
   if(!cmpCheck)
   {
      return res.status(400).send({error: "The Company Id Does Not Exists"});
   }
   else{
      //Main code for adding the product to the quotation
      QuotationDetail= await quotation.findById(req.params.id);
      if(!QuotationDetail)
      {
         return res.status(404).send({error: "The Quotation Num does not exists, PLease enter right id"})
      }
      let spcheck=await quotationMini.findOne({companyId: companyId, quotationNum: QuotationDetail.quotationNum, productId: req.body.productId});
      if(spcheck)
      {
         return res.status(400).send({error: "The Product Already Exists in the Quotation"})
      }
      req.body.companyId=companyId;
      req.body.quotationNum=QuotationDetail.quotationNum;
      const quotationadd=new quotationMini(req.body);
      await quotationadd.save();

      //Update the totalAmount in the quotationDetail
      let temp=QuotationDetail.totalAmount+(req.body.quantity*req.body.perPicePrice);
      await quotation.findByIdAndUpdate(req.params.id, {$set:{totalAmount:temp}})
      
      //Making entry in logbook
      var currentdate=new Date();
      let statment="UserId:"+employeeId+" added new quotation product having productId:"+req.body.productId+" in the quotationNum:"+QuotationDetail.quotationNum+" at "+currentdate.getDate() + "/"+ (currentdate.getMonth()+1)  + "/" + currentdate.getFullYear() + " @ "  + currentdate.getHours() + ":"  + currentdate.getMinutes() + ":" + currentdate.getSeconds();
      await CmpLogADetailBook.findOneAndUpdate({companyId: companyId},{$push:{comment: [statment]}})
      
      res.send({success: "New Product Added To Quotation Successfull"});
   }
})

//CASE 3:Edit Product Of Quotation Endpoint
router.put("/editproduct/:id", fetchuser, async (req, res)=>{
   //Check first the quotation id exists at the company Id or not
   //Here take the id of the quotationMini
   const {companyId, employeeId}=req.details;
   let cmpCheck=await newCompany.findOne({companyId: companyId});
   if(!cmpCheck)
   {
      return res.status(400).send({error: "The Company Id Does Not Exists"});
   }
   let spcheck=await quotationMini.findById(req.params.id)
   if(spcheck)
   {
      const {quotationNum}=spcheck;
      const {productId, quantity, perPicePrice}=req.body;
      
      // const updateProduct={};
      // if(quantity){updateProduct.quantity=quantity};
      // if(perPicePrice){updateProduct.perPicePrice=perPicePrice};
      
      qupdate=await quotationMini.findByIdAndUpdate(req.params.id, {$set: {quantity: quantity, perPicePrice: perPicePrice}})
      
      //Making change in the qutation's total Amount
      QuotationDetail= await quotation.findOne({companyId: companyId, quotationNum: quotationNum});
      let temp=QuotationDetail.totalAmount+(quantity*perPicePrice)-(spcheck.quantity*spcheck.perPicePrice);
      await quotation.findOneAndUpdate({companyId: companyId, quotationNum: quotationNum}, {$set:{totalAmount:temp}})

      //Making entry in logbook
      var currentdate=new Date();
      let statment="UserId:"+employeeId+" edited quotation product having productId:"+productId+" in quotationNum:"+quotationNum+" at "+currentdate.getDate() + "/"+ (currentdate.getMonth()+1)  + "/" + currentdate.getFullYear() + " @ "  + currentdate.getHours() + ":"  + currentdate.getMinutes() + ":" + currentdate.getSeconds();
      await CmpLogADetailBook.findOneAndUpdate({companyId: companyId},{$push:{comment: [statment]}})

      res.send({success: "Quotation Edited successfully"});
   }
   else
   {
      return res.status(400).send({error: "The Product in the Given Quotation Number does not exists"})
   }
})

//CASE 4:Delete The Product Of Quotation Endpoint
router.delete("/deleteproduct/:id", fetchuser, async (req, res)=>{
   //Here the id is of the quotationMini
   const {companyId, employeeId}=req.details;
   let deleteProd=await quotationMini.findById(req.params.id);
   const {quotationNum}=deleteProd;
   if(!deleteProd)
   {
      return res.status(400).send({error: "The Product In the Quotation Does Not Exists"})
   }
   else{
      deleteProd=await quotationMini.findByIdAndDelete(req.params.id);
      
      //Updating the totalAmount of the quotation
      QuotationDetail= await quotation.findOne({companyId: companyId, quotationNum: quotationNum});
      let temp=QuotationDetail.totalAmount-(deleteProd.quantity*deleteProd.perPicePrice);
      await quotation.findOneAndUpdate({companyId: companyId, quotationNum: quotationNum}, {$set:{totalAmount:temp}})

      //Making entry in logbook
      var currentdate=new Date();
      let statment="UserId:"+employeeId+" deleted quotation product having productId:"+deleteProd.productId+" in quotationNum:"+deleteProd.quotationNum+" at "+currentdate.getDate() + "/"+ (currentdate.getMonth()+1)  + "/" + currentdate.getFullYear() + " @ "  + currentdate.getHours() + ":"  + currentdate.getMinutes() + ":" + currentdate.getSeconds();
      await CmpLogADetailBook.findOneAndUpdate({companyId: companyId},{$push:{comment: [statment]}})

      res.send({success: "The Product Of Quotation Deleted"})
   }
})

//CASE 5:Delete Quotation Endpoint
router.delete("/deletequotation/:id", fetchuser, async (req, res)=>{
   const {companyId, employeeId}=req.details;
   let deletequotat=await quotation.findById(req.params.id);
   if(!deletequotat)
   {
      return res.status(400).send({error: "The Quotation Does Not Found"})
   }
   else
   {
      deletequotat=await quotation.findByIdAndDelete(req.params.id);
      await quotationMini.deleteMany({companyId: companyId, quotationNum:deletequotat.quotationNum})

      //Making entry in logbook
      var currentdate=new Date();
      let statment="UserId:"+employeeId+" deleted quotation having quotationNum:"+deletequotat.quotationNum+" at "+currentdate.getDate() + "/"+ (currentdate.getMonth()+1)  + "/" + currentdate.getFullYear() + " @ "  + currentdate.getHours() + ":"  + currentdate.getMinutes() + ":" + currentdate.getSeconds();
      await CmpLogADetailBook.findOneAndUpdate({companyId: companyId},{$push:{comment: [statment]}})
      
      res.send({success: "The Quotation Deleted"})
   }
})

//CASE 6:Add Quotation To Sales Order
router.get("/addtosales/:id", fetchuser, async (req, res)=>{
   //Details to be added in the modal like dispatching status, dispatching date, broker name, payment term, comment
   //Data is tobe taken from quotation and quotationMini and be inserted in sales, salesMini
   const {companyId, employeeId}=req.details;
   let finalQuotation=await quotation.findById(req.params.id);
   if(!finalQuotation)
   {
      return res.status(404).send({error: "The given quotation does not exists"})
   }
   let Num=finalQuotation.quotationNum;
   const newSalesOrder={};
   const {quotationNum, dealer, totalAmount}=finalQuotation;
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
   let sorder=await SalesOrder.findOne({companyId: companyId, SalesOrderNum: req.body.SalesOrderNum})
   if(sorder)
   {
      return res.status(404).send({error: "Such Order Number Exists, Enter an Unique Order Number"});
   }
   else{
      const newOrder=new SalesOrder(newSalesOrder);
      await newOrder.save();
      let quotation1=await quotation.findByIdAndDelete(req.params.id)
      //Adding And Deleting products of the sales and quotation
      let orderProducts;
      do{
         const newProduct={};
         orderProducts=await quotationMini.findOneAndDelete({companyId: companyId, quotationNum: finalQuotation.quotationNum});
         if(orderProducts)
         {
            const {categoryId, categoryName, productId, productName, quantity, perPicePrice}=orderProducts;
            {newProduct.companyId=companyId};
            {newProduct.SalesOrderNum=SalesOrderNum};
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
      let statment="UserId:"+employeeId+" transfered the quotationNum:"+quotation1.quotationNum+" to sales order having salesOrderNum:"+req.body.SalesOrderNum+" at "+currentdate.getDate() + "/"+ (currentdate.getMonth()+1)  + "/" + currentdate.getFullYear() + " @ "  + currentdate.getHours() + ":"  + currentdate.getMinutes() + ":" + currentdate.getSeconds();
      await CmpLogADetailBook.findOneAndUpdate({companyId: companyId},{$push:{comment: [statment]}})

      res.send({success: "New Product Added successfull to the sales Order"});
   }
})

//CASE 7:Get the details of the product at the given id
router.get("/getproductdetailsbyid/:id", fetchuser, async (req, res)=>{
   const {companyId}=req.details;
   let quotationDetail=await quotationMini.findById(req.params.id);
   res.send(quotationDetail);
}) 
module.exports=router;