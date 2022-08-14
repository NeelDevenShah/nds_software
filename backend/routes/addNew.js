const express=require("express");
const router=express.Router();
const {body, validationResult}=require('express-validator');
const newCompany=require("../models/Company_registry")
const newProductCategory=require("../models/NewProductCategory")
const newProduct=require("../models/newproduct_registry")
const addProduct=require("../models/AddProduct");
const SalesOrderMini = require("../models/SalesOrderMini");
const PurchaseOrderMini = require("../models/PurchaseOrderMini");
const QuotationMini = require("../models/QuotationMini");

//CASE 1:Add new Product Category Endpoint
router.get("/addcategory", async (req, res)=>{
    //Check wheather the category with this name already exists
    let cmpcheck=await newCompany.findOne({companyId: req.body.companyId});
    let category1=await newProductCategory.findOne({companyId: req.body.companyId, categoryId: req.body.categoryId});
    if(!cmpcheck)
    {
        return res.status(400).json({error: "The Company id does not exists"});
    }
    if(category1)
    {
        return res.status(400).json({error: "The product category already exists"})
    }
    const cat=new newProductCategory(req.body);
    cat.save();
    res.send(req.body)
})

//CASE 2:Add new Product Endpoint
router.get("/addnewproduct", async(req, res)=>{
    //Check wheather the product with this companyId, productName already exists
    let cmpcheck=await newCompany.findOne({companyId: req.body.companyId});
    let product=await newProduct.findOne({companyId: req.body.companyId, productId: req.body.productId})
    if(!cmpcheck)
    {
        return res.status(400).json({error: "The company with such id does not exists"})
    }
    if(product)
    {
        return res.status(400).json({error: "The Product already exists"})
    }
    const newprod=new newProduct(req.body);
    newprod.save();
    res.send(req.body);
})

//CASE 3: Add more product to existing product at specific address if exists than update its quantity, _id required as the parameter Endpoint
router.get("/addproduct/:id", async(req, res)=>{
    //Here the id is of the addProduct which is** now to be changed to the if of newProducts
    let details=await newProduct.findById(req.params.id);
    const {companyId, categoryId, productId, productcategory, productName}=details;
    const {prodWarehouseId, qty}=req.body;

    let productdet=await addProduct.findOne({companyId: companyId, categoryId: categoryId, productId: productId, prodWarehouseId: prodWarehouseId})
    //CASE A: If Does not exist than add a new at particular given location
    if(!productdet)
    {
        const newProdcutAtWare={};
        {newProdcutAtWare.companyId=companyId};
        {newProdcutAtWare.categoryId=categoryId};
        {newProdcutAtWare.productcategory=productcategory};
        {newProdcutAtWare.productId=productId};
        {newProdcutAtWare.productName=productName};
        {newProdcutAtWare.quantity=qty};
        {newProdcutAtWare.demand="regular"};
        {newProdcutAtWare.predictedDemand=0};
        {newProdcutAtWare.prodWarehouseId=prodWarehouseId};
        
        const newPr=new addProduct(newProdcutAtWare);
        await newPr.save();
        res.send(req.body);   
    }
    //CASE B: If exists at the specific position than update its quantity by adding the new quantity to existsing one
    else
    {
        //Find the product to be updated and find it
        prod=await addProduct.findOneAndUpdate({companyId: companyId, categoryId: categoryId, productId: productId, prodWarehouseId: prodWarehouseId}, {$set:{quantity:productdet.quantity+qty}})
        res.json({prod})
    }
})

//CASE 4: Delete Company's Product Categories
//Intially while making an company an product Category by the name default will be maked automatically which cannot be deleted, If any warehouse is deleted than its products/data will be transfered to the default warehouse of company
router.delete("/deletecategory/:id", async (req,res)=>{
    let categoryDetails=await newProductCategory.findById(req.params.id);
    if(!categoryDetails)
    {
        return res.status(404).send({error: "The Selected Product Category Does Not Exists"});
    }
    if(categoryDetails.categoryId==0)
    {
        return res.status(404).send({error: "Cannot delete default Product Category"});
    }
    categoryDetails=await newProductCategory.findByIdAndDelete(req.params.id);
    let changeCat
    do{
        changeCat=await addProduct.findOneAndUpdate({categoryId: categoryDetails.categoryId}, {$set:{categoryId:0, productcategory: "default"}})
    }
    while(changeCat);
    do{
        changeCat=await newProduct.findOneAndUpdate({categoryId: categoryDetails.categoryId}, {$set:{categoryId:0, productcategory: "default"}})
    }
    while(changeCat);
    do{
        changeCat=await PurchaseOrderMini.findOneAndUpdate({categoryId: categoryDetails.categoryId}, {$set:{categoryId:0, categoryName: "default"}})
    }
    while(changeCat);
    do{
        changeCat=await QuotationMini.findOneAndUpdate({categoryId: categoryDetails.categoryId}, {$set:{categoryId:0, categoryName: "default"}})
    }
    while(changeCat);
    do{
        changeCat=await SalesOrderMini.findOneAndUpdate({categoryId: categoryDetails.categoryId}, {$set:{categoryId:0, categoryName: "default"}})
    }
    while(changeCat);
    res.json("Warehouse delete successfull")
})

//CASE 5:Delete/Subtract Some product from a warehouse of company
router.get("/deletesomeproduct/:id", async (req, res)=>{
    //Here the id is of the newProduct(Which is without warehouse id)
    let details=await newProduct.findById(req.params.id);
    const {companyId, categoryId, productId }=details;
    //If the product exists than find the product at particular location exists or not in company's account
    let productdet=await addProduct.findOne({companyId: companyId, categoryId: categoryId, productId: productId, prodWarehouseId: req.body.prodWarehouseId})
    if(!productdet)
    {
        return res.status(400).json({error: "The Product does not exists"})
    }
   //Find the product to be updated and find it
    prod=await addProduct.findOneAndUpdate({companyId: companyId, categoryId: categoryId, productId: productId, prodWarehouseId: req.body.prodWarehouseId}, {$set:{quantity:productdet.quantity-req.body.minusQut}})
    res.json({prod})
})

//CASE 6:Delete Product which is been added in the addproduct
router.delete("/deleteproduct/:id", async (req,res)=>{
    //In this case all the products are been deleted and no trace of then are found further
    //There are three cases 1. Delete The Product At Given Warehouse, Delete Product At All Warehouse And Remove from the list
    let mainProductInfo=await newProduct.findById(req.params.id);
    if(!mainProductInfo)
    {
        return res.status(404).send({error: "The Product Does Not Exists"})
    }
    const {companyId, categoryId, productId}=mainProductInfo;
    const {prodWarehouseId}=req.body;
    //If prodWarehouseId is -1, Then delete from all warehouse and list
    //CASE A: Delete The Product At Given Warehouse
    if(prodWarehouseId!=-1)
    {
        let deleteAtWH=await addProduct.findOneAndDelete({companyId: companyId, categoryId: categoryId, productId: productId, prodWarehouseId: prodWarehouseId})
        if(deleteAtWH)
        {
            return res.send({success: "Product deleted from the given warehouse Successfully"})
        }
        else
        {
            return res.status(404).send({error: "The Product Not Found At The Given Warehouse"});
        }
    }
    //CASE B: Delete Product At All Warehouse And Remove from the list
    else
    {
         await newProduct.findByIdAndDelete(req.params.id);
         let deleteAtWH
         do{
            deleteAtWH=await addProduct.findOneAndDelete({companyId: companyId, categoryId: categoryId, productId: productId})
         }
         while(deleteAtWH);
         res.send({success: "Product Deleted Successfully"})
    }
})
module.exports=router