const express=require("express");
const router=express.Router();
const {body, validationResult}=require('express-validator');
const newProduct=require("../models/newproduct_registry");
const addProduct=require("../models/AddProduct")

//CASE 1: Move The Stock
router.get("/movestock/:id", async (req,res)=>{
    //While moving the stock we will get the id of the stock from where we want to move the stock
    //While moving the stock there are two condiotions the first is the product is not present there and the other is the product is present there
    let deleteItem=await addProduct.findById(req.params.id);
    const {companyId, categoryId, productcategory, productId, productName, quantity, prodWarehouseId}=deleteItem;
    const {newProdWarehouseId, qty}=req.body;
    if(prodWarehouseId==newProdWarehouseId)
    {
        return res.status(404).send({error: "Cannot Move the Product To the Same Warehouse"});
    }
    if(quantity==qty)
    {
        //Delete product from old warehouse and add product to new warehouse
        tempDelete=await addProduct.findByIdAndDelete(req.params.id);
        //There are two cases:   
        let productExistance=await addProduct.findOne({companyId: companyId, categoryId: categoryId, productId: productId, prodWarehouseId: newProdWarehouseId})
        if(productExistance)
        {
            //CASE A: The Product Exists Already, Update its quantity
            setProductQty=await addProduct.findOneAndUpdate({companyId: companyId, categoryId: categoryId, productId: productId, prodWarehouseId: newProdWarehouseId}, {$set:{quantity: productExistance.quantity+qty}})
            res.json({Success: "Product Moved Successfully"})
        }
        else
        {
            //CASE B: If the Produt Does Not Exists, Make One
            const newProduct={};
            {newProduct.companyId=companyId};
            {newProduct.categoryId=categoryId};
            {newProduct.productcategory=productcategory};
            {newProduct.productId=productId};
            {newProduct.productName=productName};
            {newProduct.quantity=qty};
            {newProduct.demand="regular"};
            {newProduct.predictedDemand=0};
            {newProduct.prodWarehouseId=newProdWarehouseId};
        
            const newpr=new addProduct(newProduct);
            await newpr.save();
            res.send(req.body);
        }
    }
    if(quantity<qty)
    {
        return res.status(404).send({error: "The Quantity Tobe Transfered is more than the existing quantity of the product, Try again with right quantity"});
    }
    if(quantity>qty)
    {
        //Update product from old warehouse to the new quantity
        tempDelete=await addProduct.findByIdAndUpdate(req.params.id, {$set:{quantity: deleteItem.quantity-qty}})
        //There are two cases:   
        let productExistance=await addProduct.findOne({companyId: companyId, categoryId: categoryId, productId: productId, prodWarehouseId: newProdWarehouseId})
        if(productExistance)
        {
            //CASE A: The Product Exists Already, Update its quantity
            setProductQty=await addProduct.findOneAndUpdate({companyId: companyId, categoryId: categoryId, productId: productId, prodWarehouseId: newProdWarehouseId}, {$set:{quantity: productExistance.quantity+qty}})
            res.json({Success: "Product Moved Successfully"})
        }
        else
        {
            //CASE B: If the Produt Does Not Exists, Make One
            const newProduct={};
            {newProduct.companyId=companyId};
            {newProduct.categoryId=categoryId};
            {newProduct.productcategory=productcategory};
            {newProduct.productId=productId};
            {newProduct.productName=productName};
            {newProduct.quantity=qty};
            {newProduct.demand="regular"};
            {newProduct.predictedDemand=0};
            {newProduct.prodWarehouseId=newProdWarehouseId};
        
            const newpr=new addProduct(newProduct);
            await newpr.save();
            res.send(req.body);
        }
    }
})

//CASE 2: Delete The Product From The Warehouse
router.delete("/deletefromwh/:id", async (req, res)=>{
    //In this there are two cases, The one is to delete some of the existing item and the other is to delete all the item present in that warehouse
    //If to remove all the items than send -1 in the qty
    let whProduct=await addProduct.findById(req.params.id);
    const {companyId, categoryId, productcategory, productId, productName, quantity, prodWarehouseId}=whProduct;
    const {qty}=req.body;
    if(qty>quantity)
    {
        res.status(404).send({error: "The Quantity Entered To Delete Is More Than The Existing Quantity Of The Product"})
    }
    if(qty==-1)
    {
        //CASE A: Delete All The Quantity Of The Product Present
        deleteProduct=await addProduct.findByIdAndDelete(req.params.id);
        res.send({Success: "The Product Delete Successfull"});
    }
    else
    {
        //CASE B: Delete Some Of the Product From The Warehouse
        tempDelete=await addProduct.findByIdAndUpdate(req.params.id, {$set:{quantity: whProduct.quantity-qty}})
        res.send({Success: "Product Delete Successfully"})
    }
})
module.exports=router