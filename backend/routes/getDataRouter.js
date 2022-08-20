const express=require("express");
const router=express.Router();
const {body, validationResult}=require("express-validator");
const AddProduct=require("../models/AddProduct");
const CmpLogADetailBook=require("../models/CmpLogADetailBook");
const CompanyUser=require("../models/CompanyUser");
const Company_registry=require("../models/Company_registry");
const NewProductCategory=require("../models/NewProductCategory");
const PurchaseOrder=require("../models/PurchaseOrder");
const PurchaseOrderMini=require("../models/PurchaseOrderMini");
const Quotation=require("../models/Quotation");
const QuotationMini=require("../models/QuotationMini");
const SalesOrder=require("../models/SalesOrder");
const SalesOrderMini=require("../models/SalesOrderMini");
const Warehouse_register=require("../models/Warehouse_register");
const newproduct_registry=require("../models/newproduct_registry");
const fetchuser=require("../middleware/fetchuser");
const fetchcompany=require("../middleware/fetchcompany");

router.get("/getwarehouses", fetchuser, async (req,res)=>{
    const warehouses=await Warehouse_register.find({companyId: req.details.companyId});
    res.json(warehouses);
})

router.get("/getcategories", fetchuser, async (req,res)=>{
    const productCategories=await NewProductCategory.find({companyId: req.details.companyId});
    res.json(productCategories);
})

router.get("/getcategorywisestock/:id", fetchuser, async (req,res)=>{
    const productCategories=await NewProductCategory.findById(req.params.id)
    if(!productCategories)
    {
        return res.status(404).send({error: "Does not exists"})
    }
    const productswithcategory=await newproduct_registry.find({companyId: req.details.companyId, categoryId: productCategories.categoryId});
    res.json(productswithcategory);
})

router.get("/getquotations", fetchuser, async (req,res)=>{
    const quotations=await Quotation.find({companyId: req.details.companyId});
    res.json(quotations);
})

router.get("/getquotationproducts", fetchuser, async (req,res)=>{
    const productsofquotation=await QuotationMini.find({companyId: req.details.companyId, quotationNum: req.header("quotationNum")});
    res.json(productsofquotation);
})

router.get("/getallstockproductsofcompany", fetchuser, async (req,res)=>{
    const fullstockofcmp=await newproduct_registry.find({companyId: req.details.companyId});
    res.json(fullstockofcmp);
})

router.get("/getproductsofwarehouse", fetchuser, async (req,res)=>{
    const productsofwh=await AddProduct.find({companyId: req.details.companyId, prodWarehouseId: req.body.prodWarehouseId});
    res.json(productsofwh);
})

router.get("/purchaseorders", fetchuser, async (req,res)=>{
    const purchaseordersofcmp=await PurchaseOrder.find({companyId: req.details.companyId});
    res.json(purchaseordersofcmp);
})

router.get("/productsofpurchaseorder", fetchuser, async (req,res)=>{
    const prodofpurchaseorder=await PurchaseOrderMini.find({companyId: req.details.companyId, purchaseOrderNum: req.body.purchaseOrderNum});
    res.json(prodofpurchaseorder);
})

router.get("/salesorders", fetchuser, async (req,res)=>{
    const salesorderofcmp=await SalesOrder.find({companyId: req.details.companyId});
    res.json(salesorderofcmp);
})

router.get("/productsofsalesorder", fetchuser, async (req,res)=>{
    const prodofsalesorder=await SalesOrderMini.find({companyId: req.details.companyId, SalesOrderNum: req.body.SalesOrderNum});
    res.json(prodofsalesorder);
})

router.get("/getproductofcategory", fetchuser, async (req, res)=>{
    const products=await newproduct_registry.find({companyId: req.details.companyId, categoryId: req.header("categoryId")});
    res.json(products);
})

module.exports=router
