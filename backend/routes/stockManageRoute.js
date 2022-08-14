const express=require("express");
const router=express.Router();
const {body, validationResult}=require('express-validator');

//CASE 1: Move The Stock
router.get("/movestock", async (req,res)=>{
    //While moving the stock we will get the id of the stock from where we want to move the stock
    //While moving the stock there are two condiotions the first is the product is not present there and the other is the product is present there
    
})
module.exports=router