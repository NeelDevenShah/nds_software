const express=require("express");
const router=express.Router();
const {body, validationResult}=require('express-validator');
const newCompany=require("../models/Company_registry")
const newProductCategory=require("../models/NewProductCategory")
const newProduct=require("../models/newproduct_registry")
const addProduct=require("../models/AddProduct");

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

//CASE 3: Add more product to existing product at specific address if exists than update it, _id required as the parameter Endpoint
router.get("/addproduct/:id", async(req, res)=>{
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
    let productdet1=await addProduct.findOne({companyId: req.body.companyId, categoryId: req.body.categoryId, productId: req.body.productId, prodWarehouse: req.body.prodWarehouse})
    //CASE 1': If Does not exist than add a new at particular location
    if(!productdet1)
    {
        const newPr=new addProduct(req.body);
        newPr.save();
        res.send(req.body);    
    }
    //CASE 2': If exists at the specific position than update it
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
        if(quantity){ChangeExistingProd.quantity=quantity};
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

module.exports=router