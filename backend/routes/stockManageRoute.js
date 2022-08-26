const express=require("express");
const router=express.Router();
const {body, validationResult}=require('express-validator');
const newProduct=require("../models/newproduct_registry");
const addProduct=require("../models/AddProduct")
const CmpLogADetailBook=require("../models/CmpLogADetailBook")
const fetchcompany=require("../middleware/fetchcompany");
const fetchuser=require("../middleware/fetchuser");

//CASE 1: Move The Stock
router.put("/movestock/:id", fetchuser, async (req,res)=>{
    //While moving the stock we will get the id of the stock from where we want to move the stock
    //While moving the stock there are two condiotions the first is the product is not present there and the other is the product is present there
    const {companyId, employeeId}=req.details;
    let deleteItem=await addProduct.findById(req.params.id);
    if(!deleteItem)
    {
        return res.send({error: "The Product Does Not Exists"})
    }
    const {categoryId, productcategory, productId, productName, quantity, prodWarehouseId}=deleteItem;
    const {newProdWarehouseId, qty}=req.body;
    if(prodWarehouseId==newProdWarehouseId)
    {
        return res.send({error: "Cannot Move the Product To the Same Warehouse"});
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
            
            //Make change in the newProduct collection, In it change inwarehouses
            demo=await newProduct.findOne({companyId: companyId, categoryId: categoryId, productId: productId});
            await newProduct.findOneAndUpdate({companyId: companyId, categoryId: categoryId, productId: productId}, {$set:{inWarehouses: demo.inWarehouses-1}})

            //Making entry in logbook
            var currentdate=new Date();
            let statment="User having userId:"+employeeId+" has moved product having productId:"+productId+" from warehouse having whid:"+deleteItem.prodWarehouseId+" to whid:"+req.body.newProdWarehouseId+" of quantity:"+qty+" at "+currentdate.getDate() + "/"+ (currentdate.getMonth()+1)  + "/" + currentdate.getFullYear() + " @ "  + currentdate.getHours() + ":"  + currentdate.getMinutes() + ":" + currentdate.getSeconds();;
            await CmpLogADetailBook.findOneAndUpdate({companyId: companyId},{$push:{comment: [statment]}})
            
            res.send({success: "success"});
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
        
            //Here there will be no change in the number of the warehouses as the one is added and the other is deleted from an warehouse

            const newpr=new addProduct(newProduct);
            await newpr.save();
            
            //Making entry in logbook
            var currentdate=new Date();
            let statment="UserId:"+employeeId+" has moved product having productId:"+productId+" from warehouse having whid:"+deleteItem.prodWarehouseId+" to whid:"+req.body.newProdWarehouseId+" of quantity:"+qty+" at "+currentdate.getDate() + "/"+ (currentdate.getMonth()+1)  + "/" + currentdate.getFullYear() + " @ "  + currentdate.getHours() + ":"  + currentdate.getMinutes() + ":" + currentdate.getSeconds();;
            await CmpLogADetailBook.findOneAndUpdate({companyId: companyId},{$push:{comment: [statment]}})
            
            res.send({success: "success"});
        }
    }
    if(quantity<qty)
    {
        return res.send({error: "The Quantity Tobe Transfered is more than the existing quantity of the product, Try again with right quantity"});
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
            
            //Here there will be no change in the number of the warehouses as the one is added and the other is deleted from an warehouse

            //Making entry in logbook
            var currentdate=new Date();
            let statment="UserId:"+employeeId+" has moved product having productId:"+productId+" from warehouse having whid:"+deleteItem.prodWarehouseId+" to whid:"+req.body.newProdWarehouseId+" of quantity:"+qty+" at "+currentdate.getDate() + "/"+ (currentdate.getMonth()+1)  + "/" + currentdate.getFullYear() + " @ "  + currentdate.getHours() + ":"  + currentdate.getMinutes() + ":" + currentdate.getSeconds();;
            await CmpLogADetailBook.findOneAndUpdate({companyId: companyId},{$push:{comment: [statment]}})
            
            res.send({success: "success"})
        }
        else
        {
            //CASE B: If the Produt Does Not Exists, Make One
            const newProduct1={};
            {newProduct1.companyId=companyId};
            {newProduct1.categoryId=categoryId};
            {newProduct1.productcategory=productcategory};
            {newProduct1.productId=productId};
            {newProduct1.productName=productName};
            {newProduct1.quantity=qty};
            {newProduct1.demand="regular"};
            {newProduct1.predictedDemand=0};
            {newProduct1.prodWarehouseId=newProdWarehouseId};
        
            const newpr=new addProduct(newProduct1);
            await newpr.save();

             //Make change in the newProduct collection, In it change inwarehouses
            let demo=await newProduct.findOne({companyId: companyId, categoryId: categoryId, productId: productId});
             await newProduct.findOneAndUpdate({companyId: companyId, categoryId: categoryId, productId: productId}, {$set:{inWarehouses: demo.inWarehouses+1}})

             //Making entry in logbook
             var currentdate=new Date();
             let statment="UserId:"+employeeId+" has moved product having productId:"+productId+" from warehouse having whid:"+deleteItem.prodWarehouseId+" to whid:"+req.body.newProdWarehouseId+" of quantity:"+qty+" at "+currentdate.getDate() + "/"+ (currentdate.getMonth()+1)  + "/" + currentdate.getFullYear() + " @ "  + currentdate.getHours() + ":"  + currentdate.getMinutes() + ":" + currentdate.getSeconds();;
             await CmpLogADetailBook.findOneAndUpdate({companyId: companyId},{$push:{comment: [statment]}})

             res.send({success: "success"})
        }
    }
})

//CASE 2: Delete The Product From The Warehouse
router.delete("/deletefromwh/:id", fetchuser, async (req, res)=>{
    //In this there are two cases, The one is to delete some of the existing item and the other is to delete all the item present in that warehouse
    //If to remove all the items than send -1 in the qty
    const {companyId, employeeId}=req.details;
    let whProduct=await addProduct.findById(req.params.id);
    if(!whProduct)
    {
        return res.send({error: "The Product at particular location does not exists"})
    }
    const {categoryId, productId, quantity, prodWarehouseId}=whProduct;
    let qty=req.header('qty')
    if(qty>quantity)
    {
        res.send({error: "The Quantity Entered To Delete Is More Than The Existing Quantity Of The Product"})
    }
    if(qty==-1 || qty==whProduct.quantity)
    {
        //CASE A: Delete All The Quantity Of The Product Present in this warehouse
        deleteProduct=await addProduct.findByIdAndDelete(req.params.id);

        //Make change in the newProduct collection, In it change inwarehouses
        let demo=await newProduct.findOne({companyId: companyId, categoryId: categoryId, productId: productId});
        if(demo.inWarehouses-1==0 && demo.quantity-qty==0)
        {
            await newProduct.findOneAndDelete({companyId: companyId, categoryId: categoryId, productId: productId})
        }
        else{
            await newProduct.findOneAndUpdate({companyId: companyId, categoryId: categoryId, productId: productId}, {$set:{inWarehouses: demo.inWarehouses-1, quantity: demo.quantity-qty}})
        }

        //Making entry in logbook
        var currentdate=new Date();
        let statment="UserId:"+employeeId+" has deleted all qtys of product having productId:"+productId+" from warehouse having whid:"+prodWarehouseId+" at "+currentdate.getDate() + "/"+ (currentdate.getMonth()+1)  + "/" + currentdate.getFullYear() + " @ "  + currentdate.getHours() + ":"  + currentdate.getMinutes() + ":" + currentdate.getSeconds();;
        await CmpLogADetailBook.findOneAndUpdate({companyId: companyId},{$push:{comment: [statment]}})

        res.send({success: "success"});
    }
    else
    {
        //CASE B: Delete Some Of the Product From The Warehouse
        tempDelete=await addProduct.findByIdAndUpdate(req.params.id, {$set:{quantity: whProduct.quantity-qty}})
        
        //Here the number of warehouse of the product after and before change will remain same, So there would be no change in the inwarehouses of the newProduct but qty changes
         //Make change in the newProduct collection, In it change inwarehouses
         let demo=await newProduct.findOne({companyId: companyId, categoryId: categoryId, productId: productId});
         await newProduct.findOneAndUpdate({companyId: companyId, categoryId: categoryId, productId: productId}, {$set:{quantity: demo.quantity-qty}})

        //Making entry in logbook
        var currentdate=new Date();
        let statment="UserId:"+employeeId+" has deleted "+qty+" qtys of product having productId:"+productId+" from warehouse having whid:"+prodWarehouseId+" at "+currentdate.getDate() + "/"+ (currentdate.getMonth()+1)  + "/" + currentdate.getFullYear() + " @ "  + currentdate.getHours() + ":"  + currentdate.getMinutes() + ":" + currentdate.getSeconds();;
        await CmpLogADetailBook.findOneAndUpdate({companyId: companyId},{$push:{comment: [statment]}})

        res.send({success: "success"})
    }
})
module.exports=router