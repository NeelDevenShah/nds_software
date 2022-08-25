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
const fetchcompany=require("../middleware/fetchcompany");
const fetchuser=require("../middleware/fetchuser")

//CASE 1:Company Registry EndPoint
router.post("/registerCompany",  [
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
],async(req, res)=>{
    //If there are errors than return bad request and errors
    const errors=validationResult(req);
    if(!errors.isEmpty())
    {
        return res.status(404).send({error: errors.array()});
    }
    //Check if the wanted company id already exists
    let cmpNum=await newCompany.findOne({companyId: req.body.companyId});
    try{
        if(cmpNum)
        {
            return res.status(404).send({error: "Sorry the company with this id already exists, Please enter any other id"})
        }
    }
    catch(error)
    {
        res.status(500).send("Internal Server Error");
    }
    const cmp=new newCompany(req.body);
    await cmp.save();

    //Making default warehouse of the company which cannot be deleted
    defaultWareHouse={};
    {defaultWareHouse.companyId=req.body.companyId};
    {defaultWareHouse.wname='Default Warehouse'};
    {defaultWareHouse.shopNum='Default'};
    {defaultWareHouse.add2=''};
    {defaultWareHouse.city=''};
    {defaultWareHouse.state=''};
    {defaultWareHouse.country=''};
    {defaultWareHouse.pincode=0};
    {defaultWareHouse.warehouseId=0};
    const nwh=new newWarehouse(defaultWareHouse);
    await nwh.save();

    //Making default product category of the company which can not be deleted
    defaultCategory={};
    {defaultCategory.companyId=req.body.companyId};
    {defaultCategory.categoryId=0};
    {defaultCategory.pcname='Default'};
    const dfcat=new NewProductCategory(defaultCategory);
    await dfcat.save();

    //Making default Logbook entry and making an loogbook of the company
    newEntry={};
    {newEntry.companyId=req.body.companyId};
    const regIt=new CmpLogADetailBook(newEntry);
    await regIt.save();

    //Making entry in logbook
    var currentdate=new Date();
    let statment="UserId:-1 created new company And default warehouse and product Catregory at "+currentdate.getDate() + "/"+ (currentdate.getMonth()+1)  + "/" + currentdate.getFullYear() + " @ "  + currentdate.getHours() + ":"  + currentdate.getMinutes() + ":" + currentdate.getSeconds();;
    await CmpLogADetailBook.findOneAndUpdate({companyId: req.body.companyId},{$push:{comment: [statment]}})
    res.send({success: "Company Registration Successfull"})
})

//CASE 2: Company new User endpoint(Owner's Portal)
router.post("/registeruser", fetchcompany, async (req, res)=>{
    const {companyId}=req.details;
        //Check wheather the user with this id already exists already
        let cmpcheck=await newCompany.findOne({companyId: companyId});
        if(!cmpcheck)
        {
            return res.status(400).json({error: "Sorry the company does not exists"});
        }
        let employeeId=cmpcheck.nextEmployeeId;
        await newCompany.findOneAndUpdate({companyId: companyId}, {$set: {nextEmployeeId: cmpcheck.nextEmployeeId+1}})

        req.body.companyId=companyId;
        req.body.employeeId=employeeId;
        const cmp=new companyUser(req.body);
        await cmp.save();

        //Making entry in logbook
        var currentdate=new Date();
        let statment="UserId:-1 created new user having EmployeeId:"+employeeId+", having name: "+req.body.name+" at "+currentdate.getDate() + "/"+ (currentdate.getMonth()+1)  + "/" + currentdate.getFullYear() + " @ "  + currentdate.getHours() + ":"  + currentdate.getMinutes() + ":" + currentdate.getSeconds();;
        await CmpLogADetailBook.findOneAndUpdate({companyId: companyId},{$push:{comment: [statment]}})
        res.send({success: "Company User Created Successfully"});
})

//CASE 3: New Warehouse Registry endPoint
router.post("/registerwarehouse", fetchuser ,async (req, res)=>{
    const {companyId, employeeId}=req.details;
    //Checking if the warehouse by this name already exists
    let cmpcheck=await newCompany.findOne({companyId: companyId});
    if(!cmpcheck)
    {
        return res.status(400).json({error: "The company with such id does not exists"})
    }
    let wareh1=await newWarehouse.findOne({companyId: companyId, wname: req.body.wname});
    if(wareh1)
    {
        return res.status(400).json({error: "The warehouse of this name already exists"})
    }
    let warehouseId=cmpcheck.nextwareId;
    await newCompany.findOneAndUpdate({companyId: companyId}, {$set: {nextwareId: cmpcheck.nextwareId+1}})

    req.body.companyId=companyId;
    req.body.warehouseId=warehouseId;
    const nwh=new newWarehouse(req.body);
    await nwh.save();

    //Making entry in logbook
    var currentdate=new Date();
    let statment="UserId:"+employeeId+" created new warehouse having whid:"+req.body.warehouseId+", whname: "+req.body.wname+" at "+currentdate.getDate() + "/"+ (currentdate.getMonth()+1)  + "/" + currentdate.getFullYear() + " @ "  + currentdate.getHours() + ":"  + currentdate.getMinutes() + ":" + currentdate.getSeconds();;
    await CmpLogADetailBook.findOneAndUpdate({companyId: companyId},{$push:{comment: [statment]}})

    res.send({success: "New Warehouse Registered Successfully"});
})

//CASE 4:Delete The Company's User(Owner's Portal)
router.delete("/deleteuser/:id", fetchcompany, async(req, res)=>{
    const {companyId}=req.details;
    let deleteUser=await companyUser.findById(req.params.id);
    if(!deleteUser)
    {
        return res.status(404).send({error: "User Not Found"});
    }
    if(deleteUser.companyId != companyId)
    {
        return res.status(404).send({error: "Not Allowed"});
    }
    deleteUser=await companyUser.findByIdAndDelete(req.params.id);
    
    //Making entry in logbook
    var currentdate=new Date();
    let statment="UserId:-1 deleted user having UserId:"+deleteUser.employeeId+", Username:"+deleteUser.name+" at "+currentdate.getDate() + "/"+ (currentdate.getMonth()+1)  + "/" + currentdate.getFullYear() + " @ "  + currentdate.getHours() + ":"  + currentdate.getMinutes() + ":" + currentdate.getSeconds();;
    await CmpLogADetailBook.findOneAndUpdate({companyId: companyId},{$push:{comment: [statment]}})
    
    res.send({success: "The User Deleted Successfully"})
})

//CASE 5: Delete Company's Warehouse
//Intially while making an company an warehoue by the name default will be maked automatically which cannot be deleted, If any warehouse is deleted than its products/data will be transfered to the default warehouse of company
router.delete("/deletewarehouse/:id", fetchuser, async (req,res)=>{
    const {companyId, employeeId}=req.details;
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
    let statment="UserId:"+employeeId+" deleted company's warehouse having whid:"+whdetails.warehouseId+", wname:"+whdetails.wname+" and things attached to this wh is transfered to default wh at "+currentdate.getDate() + "/"+ (currentdate.getMonth()+1)  + "/" + currentdate.getFullYear() + " @ "  + currentdate.getHours() + ":"  + currentdate.getMinutes() + ":" + currentdate.getSeconds();;
    await CmpLogADetailBook.findOneAndUpdate({companyId: companyId},{$push:{comment: [statment]}})

    res.send({success: "Warehouse delete successfull"})
})

//CASE 6:Delet An Company
router.delete("/deletecompany", fetchcompany, async (req, res)=>{
    const {companyId}=req.details;
    cmpDetail=await newCompany.findOneAndDelete({companyId: companyId, password: req.header('password')});
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
        return res.status(404).send({error: "The Company deletion Failed, Enter Right Credentials"})
    }
})
module.exports=router