const express=require("express");
const router=express.Router();
const {body, validationResult}=require("express-validator");
const DispatechedSalesOrder=require("../models/DispatechedSalesOrder");
const DispatchedSalesOrderMini=require("../models/DispatchedSalesOrderMini");
const ArrivedPurchaseOrder=require("../models/ArrivedPurchaseOrder")
const ArrivedPurchaseOrderMini=require("../models/ArrivedPurchaseOrderMini")
const fetchcompany = require("../middleware/fetchcompany");

//CASE 1: For Getting Dispatched Orders Endpoint
router.get("/getdispatcheddata", fetchcompany, async(req, res)=>{
    const data=await DispatechedSalesOrder.find({companyId: req.details.companyId});
    res.json(data);
})

//CASE 2: For Getting Products Of Dispatched Order Endpoint
router.get("/productsofdispatched", fetchcompany, async(req, res)=>{
    const data=await DispatchedSalesOrderMini.find({companyId: req.details.companyId, SalesOrderId: req.header('SalesOrderId')});
    res.json(data);
})

//CASE 3: For Getting Arrived Orders Endpoint
router.get("/getarriveddata", fetchcompany, async(req, res)=>{
    const data=await ArrivedPurchaseOrder.find({companyId: req.details.companyId});
    res.json(data);
})

//CASE 4: For Getting Products Of Arrived Orders Endpoint
router.get("/productsofarrived", fetchcompany, async(req, res)=>{
    const data=await ArrivedPurchaseOrderMini.find({companyId: req.details.companyId, purchaseOrderId: req.header('purchaseOrderId')});
    res.json(data);
})
module.exports=router