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
const CmpLogADetailBook=require("../models/CmpLogADetailBook")
const fetchcompany=require("../middleware/fetchcompany");
const fetchuser=require("../middleware/fetchuser")

//CASE 1:Add new Product Category Endpoint
router.post("/addcategory", fetchuser, async (req, res)=>{
    //Check wheather the category with this name already exists
    const {companyId, employeeId}=req.details;
    let cmpcheck=await newCompany.findOne({companyId: companyId});
    if(!cmpcheck)
    {
        return res.json({error: "The Company id does not exists"});
    }
    let category2=await newProductCategory.findOne({companyId: companyId, pcname: req.body.pcname});
    if(category2)
    {
        return res.json({error: "The product category already exists"})
    }
    let categoryId=cmpcheck.nextcatId;
    await newCompany.findOneAndUpdate({companyId: companyId}, {$set:{nextcatId: cmpcheck.nextcatId+1}})
    
    req.body.categoryId=categoryId;
    req.body.companyId=companyId;
    const cat=new newProductCategory(req.body);
    await cat.save();

    //Making entry in logbook
    var currentdate=new Date();
    let statment= "UserId:"+employeeId+" added new product category having categoryId:"+categoryId+", catName: "+req.body.pcname+" at "+currentdate.getDate() + "/"+ (currentdate.getMonth()+1)  + "/" + currentdate.getFullYear() + " @ "  + currentdate.getHours() + ":"  + currentdate.getMinutes() + ":" + currentdate.getSeconds();;
    await CmpLogADetailBook.findOneAndUpdate({companyId: companyId},{$push:{comment: [statment]}})

    res.send({success: "success"})
})

//CASE 2:Add new Product Endpoint
router.post("/addnewproduct", fetchuser, async(req, res)=>{
    //Check wheather the product with this companyId, productName already exists
    const {companyId, employeeId}=req.details;
    let cmpcheck=await newCompany.findOne({companyId: companyId});
    if(!cmpcheck)
    {
        return res.json({error: "The company with such id does not exists"})
    }
    let product=await newProduct.findOne({companyId: companyId, categoryId: req.body.categoryId ,productName: req.body.productName})
    if(product)
    {
        return res.json({error: "The Product with such name already exists, Please try again with new name"})
    }
    let productId=cmpcheck.nextproductId;
    await newCompany.findOneAndUpdate({companyId: companyId}, {$set:{nextproductId: cmpcheck.nextproductId+1}})
    
    req.body.companyId=companyId;
    req.body.productId=productId;
    req.body.quantity=0;
    req.body.demand="New Product";
    req.body.predictedDemand="-1";
    req.body.inWarehouses=0;
    const newprod=new newProduct(req.body);
    await newprod.save();

    //Making Entry In The Logbook
    var currentdate=new Date();
    let statment="UserId:"+employeeId+" created new product having categoryId:"+req.body.categoryId+", productId: "+productId+", productName:"+req.body.productName+" at "+currentdate.getDate() + "/"+ (currentdate.getMonth()+1)  + "/" + currentdate.getFullYear() + " @ "  + currentdate.getHours() + ":"  + currentdate.getMinutes() + ":" + currentdate.getSeconds();;
    await CmpLogADetailBook.findOneAndUpdate({companyId: companyId},{$push:{comment: [statment]}})

    res.send({success: "success"});
})

//CASE 3: Add more product to existing product at specific address, If exists than update its quantity, _id required as the parameter Endpoint
router.post("/addproduct/:id", fetchuser, async(req, res)=>{
    //Here the id is of the addProduct which is** now to be changed to the if of newProducts
    const {companyId, employeeId}=req.details;
    let details1=await newProduct.findById(req.params.id);
    const {categoryId, productId, productcategory, productName, inWarehouses, quantity}=details1;
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
        {newProdcutAtWare.demand="New Product"};
        {newProdcutAtWare.predictedDemand=-1};
        {newProdcutAtWare.prodWarehouseId=prodWarehouseId};
        
        req.body.companyId=companyId;
        const newPr=new addProduct(newProdcutAtWare);
        await newPr.save();

        //Also make the inwarehouses number in the newProduct collection increase by one, And increase the amt. of qty added
        await newProduct.findByIdAndUpdate(req.params.id, {$set: {inWarehouses: inWarehouses+1, quantity:quantity+req.body.qty}})

        //Making Entry In The Logbook
        var currentdate=new Date();
        let statment="UserId:"+employeeId+" added "+productId+":"+productName+" having qty:"+req.body.qty+" to warehouse having WhId:"+req.body.prodWarehouseId+" at "+currentdate.getDate() + "/"+ (currentdate.getMonth()+1)  + "/" + currentdate.getFullYear() + " @ "  + currentdate.getHours() + ":"  + currentdate.getMinutes() + ":" + currentdate.getSeconds();;
        await CmpLogADetailBook.findOneAndUpdate({companyId: companyId},{$push:{comment: [statment]}})

        res.send({success: "success"});   
    }
    //CASE B: If exists at the specific position than update its quantity by adding the new quantity to existsing one
    else
    {
        //Find the product to be updated and find it
        prod=await addProduct.findOneAndUpdate({companyId: companyId, categoryId: categoryId, productId: productId, prodWarehouseId: prodWarehouseId}, {$set:{quantity:productdet.quantity+qty}})
        await newProduct.findByIdAndUpdate(req.params.id, {$set: {quantity:quantity+req.body.qty}})

        //Making Entry In The Logbook
        var currentdate=new Date();
        let statment="UserId:"+req.body.employeeId+" added "+productId+":"+productName+" having qty:"+req.body.qty+" to warehouse having WhId:"+req.body.prodWarehouseId+" at "+currentdate.getDate() + "/"+ (currentdate.getMonth()+1)  + "/" + currentdate.getFullYear() + " @ "  + currentdate.getHours() + ":"  + currentdate.getMinutes() + ":" + currentdate.getSeconds();;
        await CmpLogADetailBook.findOneAndUpdate({companyId: companyId},{$push:{comment: [statment]}})
        
        res.send({success: "success"}); 
    }
})

//CASE 4: Delete Company's Product Categories
//Intially while making an company an product Category by the name default will be maked automatically which cannot be deleted, If any warehouse is deleted than its products/data will be transfered to the default warehouse of company
router.delete("/deletecategory/:id", fetchuser, async (req,res)=>{
    const {companyId, employeeId}=req.details;
    let categoryDetails=await newProductCategory.findById(req.params.id);
    if(!categoryDetails)
    {
        return res.send({error: "The Selected Product Category Does Not Exists"});
    }
    if(categoryDetails.categoryId==0)
    {
        return res.send({error: "Cannot delete default Product Category"});
    }
    categoryDetails=await newProductCategory.findByIdAndDelete(req.params.id);
    //Update all things related to this categoryId And name to default one
    await addProduct.updateMany({categoryId: categoryDetails.categoryId}, {$set:{categoryId:0, productcategory: "default"}})
    await newProduct.updateMany({categoryId: categoryDetails.categoryId}, {$set:{categoryId:0, productcategory: "default"}})
    await PurchaseOrderMini.updateMany({categoryId: categoryDetails.categoryId}, {$set:{categoryId:0, categoryName: "default"}})
    await QuotationMini.updateMany({categoryId: categoryDetails.categoryId}, {$set:{categoryId:0, categoryName: "default"}})
    await SalesOrderMini.updateMany({categoryId: categoryDetails.categoryId}, {$set:{categoryId:0, categoryName: "default"}})
    
    //Making entry in loogbook
    var currentdate=new Date();
    let statment="UserId:"+employeeId+" deleted product category having categoryid: "+categoryDetails.categoryId+", wname: "+categoryDetails.pcname+" and all the things attached to this will be transfered to default category at "+currentdate.getDate() + "/"+ (currentdate.getMonth()+1)  + "/" + currentdate.getFullYear() + " @ "  + currentdate.getHours() + ":"  + currentdate.getMinutes() + ":" + currentdate.getSeconds();;
    await CmpLogADetailBook.findOneAndUpdate({companyId: companyId},{$push:{comment: [statment]}})

    res.send({success: "success"})
})

    //(NOT IMPLEMETNED DUE TO FRONTEND COMPLEXITY OF GETTING SECONDARY DATA FOR SELECTION)
    //CASE 5:Subtract Some product from a warehouse of company
    router.put("/deletesomeproduct/:id", fetchuser, async (req, res)=>{
    //Here the id is of the newProduct(Which is without warehouse id)
    const {companyId, employeeId}=req.details;
    let details1=await newProduct.findById(req.params.id);
    const {categoryId, productId }=details1;
    //If the product exists than find the product at particular location exists or not in company's account
    let productdet=await addProduct.findOne({companyId: companyId, categoryId: categoryId, productId: productId, prodWarehouseId: req.body.prodWarehouseId})
    if(!productdet)
    {
        return res.json({error: "The Product does not exists"})
    }
    else{
        //Find the product to be updated and find it
        if(req.body.qty>productdet.quantity)
        {
            return res.send({error: "The Items to be deleted is more than the item present, So Not Possible"})
        }
        else if(productdet.quantity==req.body.qty)
        {
            //Delete Whole Product And Also make the inwarehouses in newProduct -1
            prod=await addProduct.findOneAndDelete({companyId: companyId, categoryId: categoryId, productId: productId, prodWarehouseId: req.body.prodWarehouseId});
            await newProduct.findByIdAndUpdate(req.params.id, {$set: {inWarehouses: details1.inWarehouses-1, quantity:details1.quantity-req.body.qty}});
        
            //Making entry in loogbook
            var currentdate=new Date();
            let statment="UserId:"+employeeId+" deleted product having Productid: "+prod.productId+", Productname: "+prod.productName+", qty:"+req.body.qty+" at whid:"+req.body.prodWarehouseId+" at "+currentdate.getDate() + "/"+ (currentdate.getMonth()+1)  + "/" + currentdate.getFullYear() + " @ "  + currentdate.getHours() + ":"  + currentdate.getMinutes() + ":" + currentdate.getSeconds();;
            await CmpLogADetailBook.findOneAndUpdate({companyId: companyId},{$push:{comment: [statment]}})

            res.send({success: "success"});
        }
        else{
            //If the qty<quantity than update the addProduct
            prod=await addProduct.findOneAndUpdate({companyId: companyId, categoryId: categoryId, productId: productId, prodWarehouseId: req.body.prodWarehouseId}, {$set:{quantity:productdet.quantity-req.body.qty}})
            await newProduct.findByIdAndUpdate(req.params.id, {$set: {quantity:details1.quantity-req.body.qty}});            

            //Making entry in loogbook
            var currentdate=new Date();
            let statment="UserId:"+employeeId+" deleted product having Productid:"+prod.productId+", Productname:"+prod.productName+", qty:"+req.body.qty+" at whid:"+req.body.prodWarehouseId+" at "+currentdate.getDate() + "/"+ (currentdate.getMonth()+1)  + "/" + currentdate.getFullYear() + " @ "  + currentdate.getHours() + ":"  + currentdate.getMinutes() + ":" + currentdate.getSeconds();;
            await CmpLogADetailBook.findOneAndUpdate({companyId: companyId},{$push:{comment: [statment]}})
            
            res.send({success: "success"});
        }
    }
})

//CASE 6:Delete Product From All Warehouse
router.delete("/deleteproduct/:id", fetchuser, async (req,res)=>{
    const {companyId, employeeId}=req.details;
    let mainProductInfo=await newProduct.findById(req.params.id);
    if(!mainProductInfo)
    {
        return res.send({error: "The Product Does Not Exists"})
    }
    const {categoryId, productId}=mainProductInfo;
    await newProduct.findByIdAndDelete(req.params.id);
    await addProduct.deleteMany({companyId: companyId, categoryId: categoryId, productId: productId});

    //Making entry in loogbook
    var currentdate=new Date();
    let statment="UserId:"+employeeId+" deleted product having Productid:"+mainProductInfo.productId+", Productname:"+mainProductInfo.productName+" from all warehouse at "+currentdate.getDate() + "/"+ (currentdate.getMonth()+1)  + "/" + currentdate.getFullYear() + " @ "  + currentdate.getHours() + ":"  + currentdate.getMinutes() + ":" + currentdate.getSeconds();
    await CmpLogADetailBook.findOneAndUpdate({companyId: companyId},{$push:{comment: [statment]}})
    res.send({success: "success"})
})
module.exports=router