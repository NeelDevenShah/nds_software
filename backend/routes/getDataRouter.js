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

//For User Portal
router.get("/getwarehouses", fetchuser, async (req,res)=>{
    const warehouses=await Warehouse_register.find({companyId: req.details.companyId});
    res.json(warehouses);
})

//For Owner Portal
router.get("/getwarehousesforcmp", fetchcompany, async (req,res)=>{
    const warehouses=await Warehouse_register.find({companyId: req.details.companyId});
    res.json(warehouses);
})

//For User Portal
router.get("/getcategories", fetchuser, async (req,res)=>{
    const productCategories=await NewProductCategory.find({companyId: req.details.companyId});
    res.json(productCategories);
})

//For Owner Portal
router.get("/getcategoriesforcmp", fetchcompany, async (req,res)=>{
    const productCategories=await NewProductCategory.find({companyId: req.details.companyId});
    res.json(productCategories);
})

//For User Portal
router.get("/getcategorywisestock/:id", fetchuser, async (req,res)=>{
    const productCategories=await NewProductCategory.findById(req.params.id)
    if(!productCategories)
    {
        return res.send({error: "Does not exists"})
    }
    const productswithcategory=await newproduct_registry.find({companyId: req.details.companyId, categoryId: productCategories.categoryId});
    res.json(productswithcategory);
})

//For Owner Portal
router.get("/getcategorywisestockforcmp/:id", fetchcompany, async (req,res)=>{
    const productCategories=await NewProductCategory.findById(req.params.id)
    if(!productCategories)
    {
        return res.send({error: "Does not exists"})
    }
    const productswithcategory=await newproduct_registry.find({companyId: req.details.companyId, categoryId: productCategories.categoryId});
    res.json(productswithcategory);
})

//For User Portal
router.get("/getquotations", fetchuser, async (req,res)=>{
    const quotations=await Quotation.find({companyId: req.details.companyId});
    res.json(quotations);
})

//For Owner Portal
router.get("/getquotationsforcmp", fetchcompany, async (req,res)=>{
    const quotations=await Quotation.find({companyId: req.details.companyId});
    res.json(quotations);
})

//For User Portal
router.get("/getquotationproducts", fetchuser, async (req,res)=>{
    const productsofquotation=await QuotationMini.find({companyId: req.details.companyId, quotationId: req.header("quotationId")});
    res.json(productsofquotation);
})

//For Owner Portal
router.get("/getquotationproductsforcmp", fetchcompany, async (req,res)=>{
    const productsofquotation=await QuotationMini.find({companyId: req.details.companyId, quotationId: req.header("quotationId")});
    res.json(productsofquotation);
})

//For User Portal
router.get("/getallstockproductsofcompany", fetchuser, async (req,res)=>{
    const fullstockofcmp=await newproduct_registry.find({companyId: req.details.companyId});
    res.json(fullstockofcmp);
})

//For Owner Portal
router.get("/getallstockproductsofcompanyforcmp", fetchcompany, async (req,res)=>{
    const fullstockofcmp=await newproduct_registry.find({companyId: req.details.companyId});
    res.json(fullstockofcmp);
})

//For User Portal
router.get("/getproductsofwarehouse/:wareId", fetchuser, async (req,res)=>{
    const productsofwh=await AddProduct.find({companyId: req.details.companyId, prodWarehouseId: req.params.wareId});
    res.json(productsofwh);
})

//For Owner Portal
router.get("/getproductsofwarehouseforcmp/:wareId", fetchcompany, async (req,res)=>{
    const productsofwh=await AddProduct.find({companyId: req.details.companyId, prodWarehouseId: req.params.wareId});
    res.json(productsofwh);
})

//For User Portal
router.get("/purchaseorders", fetchuser, async (req,res)=>{
    const purchaseordersofcmp=await PurchaseOrder.find({companyId: req.details.companyId});
    res.json(purchaseordersofcmp);
})

//For Owner Portal
router.get("/purchaseordersforcmp", fetchcompany, async (req,res)=>{
    const purchaseordersofcmp=await PurchaseOrder.find({companyId: req.details.companyId});
    res.json(purchaseordersofcmp);
})

//For User Portal
router.get("/productsofpurchaseorder", fetchuser, async (req,res)=>{
    const prodofpurchaseorder=await PurchaseOrderMini.find({companyId: req.details.companyId, purchaseOrderId: req.header('purchaseOrderId')});
    res.json(prodofpurchaseorder);
})

//For Owner Portal
router.get("/productsofpurchaseorderforcmp", fetchcompany, async (req,res)=>{
    const prodofpurchaseorder=await PurchaseOrderMini.find({companyId: req.details.companyId, purchaseOrderId: req.header('purchaseOrderId')});
    res.json(prodofpurchaseorder);
})

//For User Portal
router.get("/salesorders", fetchuser, async (req,res)=>{
    const salesorderofcmp=await SalesOrder.find({companyId: req.details.companyId});
    res.json(salesorderofcmp);
})
//For Owner Portal
router.get("/salesordersforcmp", fetchcompany, async (req,res)=>{
    const salesorderofcmp=await SalesOrder.find({companyId: req.details.companyId});
    res.json(salesorderofcmp);
})

//For User Portal
router.get("/productsofsalesorder", fetchuser, async (req,res)=>{
    const prodofsalesorder=await SalesOrderMini.find({companyId: req.details.companyId, SalesOrderId: req.header('SalesOrderId')});
    res.json(prodofsalesorder);
})

//For Owner Portal
router.get("/productsofsalesorderforcmp", fetchcompany, async (req,res)=>{
    const prodofsalesorder=await SalesOrderMini.find({companyId: req.details.companyId, SalesOrderId: req.header('SalesOrderId')});
    res.json(prodofsalesorder);
})

router.get("/getproductofcategory", fetchuser, async (req, res)=>{
    const products=await newproduct_registry.find({companyId: req.details.companyId, categoryId: req.header('categoryId')});
    res.json(products);
})

router.get("/productatparticularwarebyid/:id", fetchuser, async (req, res)=>{
    const details=await AddProduct.findById(req.params.id);
    res.json(details);
})

router.get("/getcompanydetails", fetchcompany, async(req, res)=>{
    const details=await Company_registry.findOne({companyId: req.details.companyId});
    res.json(details);
})

router.get("/getcompanyuser", fetchcompany, async(req, res)=>{
    const data=await CompanyUser.find({companyId: req.details.companyId});
    res.json(data);
})

router.get("/getlogbookdata", fetchcompany, async(req, res)=>{
    const data=await CmpLogADetailBook.findOne({companyId: req.details.companyId});
    res.json(data);
})

module.exports=router
