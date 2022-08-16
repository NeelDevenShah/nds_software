const express=require("express");
const router=express.Router();
const {body, validationResult}=require('express-validator');
const newCompany=require("../models/Company_registry");
const companyUser=require("../models/CompanyUser")
const newWarehouse=require("../models/Warehouse_register");
const newProduct = require("../models/newproduct_registry");
const NewProductCategory = require("../models/NewProductCategory");
const AddProduct = require("../models/AddProduct");
const purchaseOrderMini=require("../models/PurchaseOrderMini")
const salesOrderMini=require("../models/SalesOrderMini")
const CmpLogADetailBook=require("../models/CmpLogADetailBook");
const Quotation = require("../models/Quotation");
const QuotationMini = require("../models/QuotationMini");
const SalesOrder = require("../models/SalesOrder");
const purchaseorder=require("../models/PurchaseOrder");

//CASE 1:Company Registry EndPoint
router.get("/registerCompany",  [
    body('name', 'Enter valid name').isString(),
    body('emailId', 'Enter valid mail id').isEmail(),
    body('country', 'Enter valid country name').isString(),
    body('shopNum', 'Enter valid shop number').isString(),
    body('add2', 'Enter valid address').isString(),
    body('city', 'Enter valid city').isString(),
    body('state', 'Enter valid State').isString(),
    body('pincode', 'Enter valid Pincode').isNumeric().isLength({min: 6}).isLength({max: 6}),
    body('companyId', 'Enter an valid company Id').isNumeric(),
    body('password', 'Enter an strong Password').isLength({min: 3}),
    body('paymentNum', 'Enter valid payment number').isNumeric(),
],async(req, res)=>{
    //If there are errors than return bad request and errors
    const errors=validationResult(req);
    if(!errors.isEmpty())
    {
        return res.status(400).json({errors: errors.array()});
    }
    //Check if the wanted company id already exists
    let cmpNum=await newCompany.findOne({companyId: req.body.companyId});
    try{
        if(cmpNum)
        {
            return res.status(400).json({error: "Sorry the company with this id already exists, Please enter any other id"})
        }
    }
    catch(error)
    {
        res.status(500).send("Internal Server Error");
    }
    const cmp=new newCompany(req.body);
    cmp.save();

    //Making default warehouse of the company which cannot be deleted
    defaultWareHouse={};
    {defaultWareHouse.companyId=req.body.companyId};
    {defaultWareHouse.wname='default'};
    {defaultWareHouse.shopNum='default'};
    {defaultWareHouse.add2='default'};
    {defaultWareHouse.city='default'};
    {defaultWareHouse.state='default'};
    {defaultWareHouse.country='default'};
    {defaultWareHouse.pincode=0};
    {defaultWareHouse.warehouseId=0};
    const nwh=new newWarehouse(defaultWareHouse);
    nwh.save();

    //Making default product category of the company which can not be deleted
    defaultCategory={};
    {defaultCategory.companyId=req.body.companyId};
    {defaultCategory.categoryId=0};
    {defaultCategory.pcname='default'};
    const dfcat=new NewProductCategory(defaultCategory);
    dfcat.save();

    //Making default Logbook entry and making an loogbook of the company
    newEntry={};
    {newEntry.companyId=req.body.companyId};
    const regIt=new CmpLogADetailBook(newEntry);
    await regIt.save();

    //Making entry in logbook
    var currentdate=new Date();
    let statment="UserId:-1 created new company And default warehouse and product Catregory at "+currentdate.getDate() + "/"+ (currentdate.getMonth()+1)  + "/" + currentdate.getFullYear() + " @ "  + currentdate.getHours() + ":"  + currentdate.getMinutes() + ":" + currentdate.getSeconds();;
    await CmpLogADetailBook.findOneAndUpdate({companyId: req.body.companyId},{$push:{comment: [statment]}})
    res.send(req.body)
})

//CASE 2: Company new User endpoint(Owner's Portal)
router.get("/registeruser", [
    body('name', 'Enter an valid name').isLength({min: 3}),
    body('password', 'Enter an valid password').isLength({min: 3}),
    body('companyId', 'Enter an valid company Id').isNumeric(),
    body('employeeId', 'Enter an valid employee Id').isNumeric(),
], async (req, res)=>{
    const errors=validationResult(req);
        if(!errors.isEmpty())
        {
            return res.status(400).json({errors: errors.array()});
        }
        //Check wheather the user with this id already exists already
        let cmpcheck=await newCompany.findOne({companyId: req.body.companyId});
        let user=await companyUser.findOne({companyId: req.body.companyId, employeeId: req.body.employeeId});
        try{
            if(!cmpcheck)
            {
                return res.status(400).json({error: "Sorry the company does not exists"});
            }
            if(user)
            {
                return res.status(400).json({error: "Sorry the user with this id already exists"});
            }
        }
        catch(error)
        {
            res.status(500).send("Internal Server Error");
        }
        const cmp=new companyUser(req.body);
        cmp.save();

        //Making entry in logbook
        var currentdate=new Date();
        let statment="UserId:-1 created new user having UserId:"+req.body.employeeId+", having name: "+req.body.name+" at "+currentdate.getDate() + "/"+ (currentdate.getMonth()+1)  + "/" + currentdate.getFullYear() + " @ "  + currentdate.getHours() + ":"  + currentdate.getMinutes() + ":" + currentdate.getSeconds();;
        await CmpLogADetailBook.findOneAndUpdate({companyId: req.body.companyId},{$push:{comment: [statment]}})
        res.send(req.body);
})

//CASE 3: New Warehouse Registry endPoint
router.get("/registerwarehouse", [
    body('wname', 'Enter a valid name').isString(),
    body('shopNum', 'Enter a valid shop number').isLength({min: 2}),
    body('add2', 'Enter a valid address').isString(),
    body('city', 'Enter a valid city').isString(),
    body('state', 'Enter a valid state').isString(),
    body('country', 'Enter a valid country').isString(),
    body('pincode', 'Enter a valid pincode').isNumeric().isLength({min: 6}).isLength({max: 6}),
],async (req, res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty())
    {
        return res.status(400).json({errors: errors.array()})
    }
    //Checking if the warehouse by this name already exists
    let cmpcheck=await newCompany.findOne({companyId: req.body.companyId});
    let wareh=await newWarehouse.findOne({companyId: req.body.companyId, wname: req.body.wname});
    if(!cmpcheck)
    {
        return res.status(400).json({error: "The company with such id does not exists"})
    }
    if(wareh)
    {
        return res.status(400).json({error: "The warehouse of this id or name already exists"})
    }
    const nwh=new newWarehouse(req.body);
    nwh.save();

    //Making entry in logbook
    var currentdate=new Date();
    let statment="UserId:"+req.body.employeeId+" created new warehouse having whid:"+req.body.warehouseId+", whname: "+req.body.wname+" at "+currentdate.getDate() + "/"+ (currentdate.getMonth()+1)  + "/" + currentdate.getFullYear() + " @ "  + currentdate.getHours() + ":"  + currentdate.getMinutes() + ":" + currentdate.getSeconds();;
    await CmpLogADetailBook.findOneAndUpdate({companyId: req.body.companyId},{$push:{comment: [statment]}})

    res.send(req.body);
})

//CASE 4:Delete The Company's User(Owner's Portal)
router.delete("/deleteuser/:id", async(req, res)=>{
    let deleteUser=await companyUser.findById(req.params.id);
    if(!deleteUser)
    {
        return res.status(404).send({error: "User Not Found"});
    }
    // if(deleteUser.companyId != current company id of the user)
    // {
    //     return res.status(404).send({error: "Not Allowed"});
    // }
    deleteUser=await companyUser.findByIdAndDelete(req.params.id);
    
    //Making entry in logbook
    var currentdate=new Date();
    let statment="UserId:-1 deleted user having UserId:"+deleteUser.employeeId+", Username:"+deleteUser.name+" at "+currentdate.getDate() + "/"+ (currentdate.getMonth()+1)  + "/" + currentdate.getFullYear() + " @ "  + currentdate.getHours() + ":"  + currentdate.getMinutes() + ":" + currentdate.getSeconds();;
    await CmpLogADetailBook.findOneAndUpdate({companyId: deleteUser.companyId},{$push:{comment: [statment]}})
    
    res.send({success: "The User Deleted Successfully"})
})

//CASE 5: Delete Company's Warehouse
//Intially while making an company an warehoue by the name default will be maked automatically which cannot be deleted, If any warehouse is deleted than its products/data will be transfered to the default warehouse of company
router.delete("/deletewarehouse/:id", async (req,res)=>{
    let whdetails=await newWarehouse.findById(req.params.id);
    if(!whdetails)
    {
        return res.status(404).send({error: "The Selected Warehouse Does Not Exists"});
    }
    if(whdetails.warehouseId==0)
    {
        return res.status(404).send({error: "Cannot delete default warehouse"});
    }
    whdetails=await newWarehouse.findByIdAndDelete(req.params.id);
   
    //Transfer the product in the deleted warehouse to default warehouse
    await AddProduct.updateMany({prodWarehouseId:whdetails.warehouseId}, {$set:{prodWarehouseId:0}});
    //Transfer the purchase product in the deleted warehouse to default warehouse
    await purchaseOrderMini.updateMany({arrivingat:whdetails.warehouseId}, {$set:{arrivingat:0}});
    //Transfer the sales product in the deleted warehouse to default warehouse
    await salesOrderMini.updateMany({dispatchingFrom:whdetails.warehouseId}, {$set:{dispatchingFrom:0}})
    
    //Making entry in logbook
    var currentdate=new Date();
    let statment="UserId:"+req.body.employeeId+"deleted company's warehouse having whid:"+whdetails.warehouseId+", wname:"+whdetails.wname+" and things attached to this wh is transfered to default wh at "+currentdate.getDate() + "/"+ (currentdate.getMonth()+1)  + "/" + currentdate.getFullYear() + " @ "  + currentdate.getHours() + ":"  + currentdate.getMinutes() + ":" + currentdate.getSeconds();;
    await CmpLogADetailBook.findOneAndUpdate({companyId: whdetails.companyId},{$push:{comment: [statment]}})

    res.json("Warehouse delete successfull")
})

//CASE 6:Delet An Company
router.delete("/deletecompany", async (req, res)=>{
    const {companyId, password, repassword}=req.body;
    if(password !=repassword)
    {
        return res.status(404).send({error: "The Password Of the Company Does Not Matches"})
    }
    cmpDetail=await newCompany.findOneAndDelete({companyId: companyId, password: password});
    if(cmpDetail)
    {
        await AddProduct.deleteMany({companyId: companyId});
        await CmpLogADetailBook.deleteMany({companyId: companyId});
        await companyUser.deleteMany({companyId: companyId});
        await newProduct.deleteMany({companyId: companyId});
        await NewProductCategory.deleteMany({companyId: companyId});
        await purchaseorder.deleteMany({companyId: companyId});
        await purchaseOrderMini.deleteMany({companyId: companyId});
        await Quotation.deleteMany({companyId: companyId});
        await QuotationMini.deleteMany({companyId: companyId});
        await SalesOrder.deleteMany({companyId: companyId});
        await salesOrderMini.deleteMany({companyId: companyId});
        await newWarehouse.deleteMany({companyId: companyId})
        res.send({success: "Company Delete Successfull"})
    }
    else
    {
        return res.status(404).send({error: "The Company deletion Failed, Due to some reason"})
    }
})
module.exports=router