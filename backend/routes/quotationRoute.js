const express=require("express");
const router=express.Router();
const {body, validationResult}=require("express-validator");
const newCompany=require("../models/Company_registry")
const quotation=require("../models/Quotation");
const quotaionMini=require("../models/QuotationMini");

//CASE 1: Add new quotation Endpoint
router.get("/addquotation", async (req, res)=>{
    //Check wheather the quotation id exists if it does not exists than add one
    //Company Check
    let cmpcheck=await newCompany.findOne({companyId: req.body.companyId})
    if(!cmpcheck)
    {
        return res.status(400).findOne({error: "The company id does not exists"})
    }
    let qcheck=await quotation.findOne({companyId: req.body.companyId, quotationNum: req.body.quotationNum});
    if(qcheck)
    {
        return res.status(400).send({error: "The quotation Number Of Same Already Exists"});
    }
    else{
        const qout=new quotation(req.body);
        qout.save();
        res.send(req.body);
    }
})

module.exports=router;