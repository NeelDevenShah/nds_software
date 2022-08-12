const express=require("express");
const router=express.Router();
const {body, validationResult}=require('express-validator');
const newCompany=require("../models/Company_registry");
const companyUser=require("../models/CompanyUser")
const newWarehouse=require("../models/Warehouse_register");
const CompanyUser = require("../models/CompanyUser");

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
    res.send(req.body)
})

//CASE 2: Company new User endpoint
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
        return res.status(400).json({error: "The warehouse of this name already exists"})
    }
    const nwh=new newWarehouse(req.body);
    nwh.save();
    res.send(req.body);
})
module.exports=router