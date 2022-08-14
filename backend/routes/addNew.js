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
    //Check wheather the company and the product exists or not 
    //Check 1:
    let cmpcheck=await newCompany.findOne({companyId: req.body.companyId});
    if(!cmpcheck)
    {
        return res.status(400).json({error: "The company with this id does not exists"});
    }
    //Check 2:
    let productdet=await newProduct.findOne({companyId: req.body.companyId, categoryId: req.body.categoryId, productId: req.body.productId})
    if(!productdet)
    {
        return res.status(400).json({error: "The Product does not exists"})
    }
    //If the product exists than find the product at particular location exists or not
    let productdet1=await addProduct.findOne({companyId: req.body.companyId, categoryId: req.body.categoryId, productId: req.body.productId, prodWarehouseId: req.body.prodWarehouseId})
    //CASE 1': If Does not exist than add a new at particular location
    if(!productdet1)
    {
        const newPr=new addProduct(req.body);
        await newPr.save();
        res.send(req.body);    
    }
    //CASE 2': If exists at the specific position than update its quantity by adding the new quantity to existsing one
    else
    {
        //Updating the quantity of the existing product at the some location
        const {companyId, categoryId, productcategory, productId, productName, quantity, demand, predictedDemand, prodWarehouse}=req.body;
        const ChangeExistingProd={};
        if(companyId){ChangeExistingProd.companyId=companyId};
        if(categoryId){ChangeExistingProd.categoryId=categoryId};
        if(productcategory){ChangeExistingProd.productcategory=productcategory};
        if(productId){ChangeExistingProd.productId=productId};
        if(productName){ChangeExistingProd.productName=productName};
        if(quantity){ChangeExistingProd.quantity=productdet1.quantity+quantity};
        if(demand){ChangeExistingProd.demand=req.demand};
        if(predictedDemand){ChangeExistingProd.predictedDemand=predictedDemand};
        if(prodWarehouse){ChangeExistingProd.prodWarehouse=prodWarehouse};
        //Find the product to be updated and find it
        let prod=await addProduct.findById(req.params.id)
        if(!prod)
        {
            return res.status(404).send("The Product with such _id does not found");
        }
        //If the company id does not match than do not allow to change
        if(prod.companyId !=req.body.companyId)
        {
            return res.status(404).send("Not permited");
        }
        prod=await addProduct.findByIdAndUpdate(req.params.id, {$set: ChangeExistingProd}, {new: true})
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
    let cmpcheck=await addProduct.findOne({companyId: details.companyId});
    if(!cmpcheck)
    {
        return res.status(400).json({error: "The product with this company id does not exists"});
    }
    //If the product exists than find the product at particular location exists or not
    let productdet=await addProduct.findOne({companyId: companyId, categoryId: categoryId, productId: productId, prodWarehouseId: req.body.prodWarehouseId})
    if(!productdet)
    {
        return res.status(400).json({error: "The Product does not exists"})
    }
   //Find the product to be updated and find it
    prod=await addProduct.findOneAndUpdate({companyId: companyId, categoryId: categoryId, productId: productId, prodWarehouseId: req.body.prodWarehouseId}, {$set:{quantity:productdet.quantity-req.body.minusQut}})
    res.json({prod})
})
module.exports=router