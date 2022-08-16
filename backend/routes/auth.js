const express=require("express");
const router=express.Router();
// const {default: mongoose}=require("mongoose");
const {body, validationResult}=require("express-validator")
const JWT_SECRET="8989898NDS"
var jwt=require('jsonwebtoken');
const companyUser=require("../models/CompanyUser");
const newCompany=require("../models/Company_registry")

//For login of the company's user
router.get("/login",[
    body("companyId", "Enter An Number").isNumeric(),
    body("employeeId", "Enter An Number").isNumeric(),
], async (req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty())
    {
        return res.status(404).send({errors: errors.array()});
    }
    const {companyId, employeeId, password}=req.body;

    //For the password being encreapted, Make first change the given passwoed and than check it by the help of the bcrypt.compare refer to pg 13 of documentation

    let user=await companyUser.findOne({companyId: companyId, employeeId: employeeId, password: password});
    if(!user)
    {
        return res.status(404).send({error: "The Given Credentials are not correct, Please try again with the right credentials"});
    }
    else{
        //For making and sending the auth token
        const data={
           details:{
            companyId: companyId,
            employeeId: employeeId
           }
        }
        const authtoken=jwt.sign(data, JWT_SECRET);
        res.json({authtoken});
    }
})

//For login of the company's Owner
router.get("/cmplogin", [
    body("companyId", "Enter A Number").isNumeric()
], async (req, res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty())
    {
        return res.status(404).send({errors: errors.array()});
    }
    const {companyId, password}=req.body;

    //For the password being encreapted, Make first change the given passwoed and than check it by the help of the bcrypt.compare refer to pg 13 of documentation

    let user=await newCompany.findOne({companyId: companyId, password: password});
    if(!user)
    {
        return res.status(404).send({error: "The Given Credentials are not correct, Please try again with the right credentials"});
    }
    else{
        //For making and sending the auth token
        const data={
           details:{
            companyId: companyId,
           }
        }
        const authtoken=jwt.sign(data, JWT_SECRET);
        res.json({authtoken});
    }
})
module.exports=router