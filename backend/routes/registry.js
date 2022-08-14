const express=require("express");
const router=express.Router();
const {body, validationResult}=require('express-validator');
const newCompany=require("../models/Company_registry");
const companyUser=require("../models/CompanyUser")
const newWarehouse=require("../models/Warehouse_register");
const CompanyUser = require("../models/CompanyUser");
const NewProductCategory = require("../models/NewProductCategory");
const AddProduct = require("../models/AddProduct");
const purchaseOrderMini=require("../models/PurchaseOrderMini")
const salesOrderMini=require("../models/SalesOrderMini")

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
    res.send(req.body)
})

//CASE 2: Company new User endpoint(Owner's Portal)
router.get("/registeruser", [
    body('name', 'Enter an valid name').isLength({min: 3}),
    body('password', 'Enter an valid password').isLength({min: 3}),
    body('companyId', 'Enter an valid company Id').isNumeric(),
    body('employeeId', 'Enter an valid employee Id').isNumeric(),
    body('accessLevel', 'Enter an valid access level').isNumeric(),
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
        const cmp=new CompanyUser(req.body);
        cmp.save();
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
    let changeWh
    //Transfer the product in the deleted warehouse to default warehouse
    do
    {
        changeWh=await AddProduct.findOneAndUpdate({prodWarehouseId:whdetails.warehouseId}, {$set:{prodWarehouseId:0}});
    }
    while(changeWh);
    //Transfer the purchase product in the deleted warehouse to default warehouse
    do
    {
        changeWh=await purchaseOrderMini.findOneAndUpdate({arrivingat:whdetails.warehouseId}, {$set:{arrivingat:0}});
    }
    while(changeWh);
    //Transfer the sales product in the deleted warehouse to default warehouse
    do{
        changeWh=await salesOrderMini.findOneAndUpdate({dispatchingFrom:whdetails.warehouseId}, {$set:{dispatchingFrom:0}})
    }
    while(changeWh);
    res.json("Warehouse delete successfull")
})
module.exports=router