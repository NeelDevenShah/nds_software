const express=require("express");
const router=express.Router();
const {body, validationResult}=require("express-validator");
const newCompany=require("../models/Company_registry");
const companyUser=require("../models/CompanyUser");
const purchaseOrder=require("../models/PurchaseOrder");
const purchaseOrderMini=require("../models/PurchaseOrderMini");
const CmpLogADetailBook=require("../models/CmpLogADetailBook")
const fetchuser=require("../middleware/fetchuser");
const fetchcompany=require("../middleware/fetchcompany");

//CASE 1: Add new purchase order Endpoint
router.post("/addneworder", fetchuser, async (req, res)=>{
    //Check wheather the sales order id exists if it does not exists than add one
    const {companyId, employeeId}=req.details;
    //Company check
    let cmpcheck=await newCompany.findOne({companyId: companyId})
    if(!cmpcheck)
    {
        return res.status(400).send({error: "The company id does not exists"})
    }
    let spcheck=await purchaseOrder.findOne({companyId: companyId, purchaseOrderNum: req.body.purchaseOrderNum});
    if(spcheck)
    {
        return res.status(400).send({error: "The purchase order of the same id exists"});
    }
    else
    {
        req.body.companyId=companyId;
        const addpurchaseo=new purchaseOrder(req.body);
        await addpurchaseo.save();

        //Making entry in logbook
        var currentdate=new Date();
        let statment="UserId:"+employeeId+" created new purchase order having purchaseOrderNum:"+req.body.purchaseOrderNum+" for "+req.body.purchaseDealer+" at "+currentdate.getDate() + "/"+ (currentdate.getMonth()+1)  + "/" + currentdate.getFullYear() + " @ "  + currentdate.getHours() + ":"  + currentdate.getMinutes() + ":" + currentdate.getSeconds();
        await CmpLogADetailBook.findOneAndUpdate({companyId: companyId},{$push:{comment: [statment]}})

        res.send(req.body);
    }
})
//CASE 2: Add new purchase product in purchase order Endpoint
router.post("/addpurchaseproduct/:id", fetchuser, fetchuser, async (req, res)=>{
    //Check first the purchase order num exists at the compId or not
    const {companyId, employeeId}=req.details;
    let cmpcheck=await newCompany.findOne({companyId: companyId})
    if(!cmpcheck)
    {
        return res.status(400).send({error: "The company id does not exists"})
    }
    let spcheck=await purchaseOrder.findById(req.params.id)
    if(!spcheck)
    {
        return res.status(400).send({error: "The entered purchase order num does not exists"})
    }
    else
    {
        //Check wheather the product already does not exists in the purchase order
        let sopcheck=await purchaseOrderMini.findOne({companyId: companyId, purchaseOrderNum: spcheck.purchaseOrderNum, productId: req.body.productId});
        if(sopcheck)
        {
            return res.status(400).send({error: "The product that you are trying to add in the purchase order already exists"})
        }
        else
        {
            //Now the main code for adding the new sales order's product
            req.body.companyId=companyId;
            req.body.purchaseOrderNum=spcheck.purchaseOrderNum;
            const purchaseProduct=new purchaseOrderMini(req.body);
            await purchaseProduct.save();
            
            //Code for changing the totalAmount in the purchaseOrder
            let temp=spcheck.totalAmount+(req.body.quantity*req.body.perPicePrice);
            changeAmount=await purchaseOrder.findByIdAndUpdate(req.params.id, {$set:{totalAmount:temp}})
            
            //Making entry in logbook
            var currentdate=new Date();
            let statment="UserId:"+employeeId+" added new product for purchase order having purchaseOrderNum:"+spcheck.purchaseOrderNum+", ProductId:"+req.body.productId+" at "+currentdate.getDate() + "/"+ (currentdate.getMonth()+1)  + "/" + currentdate.getFullYear() + " @ "  + currentdate.getHours() + ":"  + currentdate.getMinutes() + ":" + currentdate.getSeconds();
            await CmpLogADetailBook.findOneAndUpdate({companyId: companyId},{$push:{comment: [statment]}})
            
            res.send(purchaseProduct);
        }
    }
})
//CASE 3: Delete Purchase Order Endpoint, You have to also provide the document id, company id, purchase order num
router.delete("/deleteorder/:id", fetchuser, fetchuser, async (req, res)=>{
    //Check first purchase order num and the companyId exists
    const {companyId, employeeId}=req.details;
    let orderidcheck=await purchaseOrder.findById(req.params.id);
    if(!orderidcheck)
    {
        return res.status(400).send({error: "The purchase order does not exists"})
    }
    //Find the purchase Order and delete order and its products
    sorder=await purchaseOrder.findByIdAndDelete(req.params.id)
    await purchaseOrderMini.deleteMany({companyId: companyId, purchaseOrderNum: sorder.purchaseOrderNum})
    
    //Making entry in logbook
    var currentdate=new Date();
    let statment="UserId:"+employeeId+" deleted purchase order having purchaseOrderNum:"+sorder.purchaseOrderNum+" at "+currentdate.getDate() + "/"+ (currentdate.getMonth()+1)  + "/" + currentdate.getFullYear() + " @ "  + currentdate.getHours() + ":"  + currentdate.getMinutes() + ":" + currentdate.getSeconds();
    await CmpLogADetailBook.findOneAndUpdate({companyId: companyId},{$push:{comment: [statment]}})

    return res.json({success: "purchase order has been deleted"})
})

//CASE 4: Delete an prouct of the purchase order Endpoint
router.delete("/deleteproduct/:id", fetchuser, async (req, res)=>{
    const {companyId, employeeId}=req.details;
    let deleteprod=await purchaseOrderMini.findById(req.params.id);
    if(!deleteprod)
    {
        return res.status(400).send({error: "The product does not exists in the sales order"});
    }
    deleteprod=await purchaseOrderMini.findByIdAndDelete(req.params.id);

    //Code for changing the totalAmount in the purchaseOrder
    purchaseOrderDet=await purchaseOrder.findOne({companyId:companyId, purchaseOrderNum:deleteprod.purchaseOrderNum});
    let temp=purchaseOrderDet.totalAmount-(deleteprod.quantity*deleteprod.perPicePrice)
    await purchaseOrder.findOneAndUpdate({companyId:companyId, purchaseOrderNum:deleteprod.purchaseOrderNum}, {$set:{totalAmount: temp}})
    
    //Making entry in logbook
    var currentdate=new Date();
    let statment="UserId:"+employeeId+" deleted product having productId:"+deleteprod.productId+" from purchase order having purchaseOrderNum:"+deleteprod.purchaseOrderNum+" at "+currentdate.getDate() + "/"+ (currentdate.getMonth()+1)  + "/" + currentdate.getFullYear() + " @ "  + currentdate.getHours() + ":"  + currentdate.getMinutes() + ":" + currentdate.getSeconds();
    await CmpLogADetailBook.findOneAndUpdate({companyId: companyId},{$push:{comment: [statment]}})

    res.send({success: "The product of the purchase order deleted"});
})

//CASE 5: Edit the sales order's Information Endpoint
router.put("/editpurchaseorder/:id", fetchuser, async (req, res)=>{
    const {companyId, employeeId}=req.details;
    const {purchaseDealer, brokerName, paymentTerm, comment, mainArrivingDate}=req.body;
    const updatedPurchase={};
    if(companyId){updatedPurchase.companyId=companyId};
    if(purchaseDealer){updatedPurchase.purchaseDealer=purchaseDealer};
    if(brokerName){updatedPurchase.brokerName=brokerName};
    if(paymentTerm){updatedPurchase.paymentTerm=paymentTerm};
    if(comment){updatedPurchase.comment=comment};
    if(purchaseDealer){updatedPurchase.purchaseDealer=purchaseDealer};
    if(mainArrivingDate){updatedPurchase.mainArrivingDate=mainArrivingDate}
    //Find the purchase order to be deleted
    let porder=await purchaseOrder.findById(req.params.id);
    if(!porder)
    {
        return res.status(404).send("The purchase order does not found");
    }
    if(porder.companyId !=companyId)
    {
        return res.status(404).send("Not Permited");
    }
    porder=await purchaseOrder.findByIdAndUpdate(req.params.id, {$set: updatedPurchase}, {new: true})
    
    //Making entry in logbook
    var currentdate=new Date();
    let statment="UserId:"+employeeId+" edited purchase order having purchaseOrderNum:"+porder.purchaseOrderNum+" at "+currentdate.getDate() + "/"+ (currentdate.getMonth()+1)  + "/" + currentdate.getFullYear() + " @ "  + currentdate.getHours() + ":"  + currentdate.getMinutes() + ":" + currentdate.getSeconds();
    await CmpLogADetailBook.findOneAndUpdate({companyId: companyId},{$push:{comment: [statment]}})
    
    res.json({porder})
})

//CASE 6: Edit the purchase order's Product Information Endpoint
router.put("/editpurchaseproduct/:id", fetchuser, async (req, res)=>{
    const {companyId, employeeId}=req.details;
    const {categoryId, categoryName, productId, productName, quantity, perPicePrice, arrivingat, arrivingDate}=req.body;
    const updatedProduct={};
    if(companyId){updatedProduct.companyId=companyId};
    if(categoryId){updatedProduct.categoryId=categoryId};
    if(categoryName){updatedProduct.categoryName=categoryName};
    if(productId){updatedProduct.productId=productId};
    if(productName){updatedProduct.productName=productName};
    if(quantity){updatedProduct.quantity=quantity};
    if(perPicePrice){updatedProduct.perPicePrice=perPicePrice};
    if(arrivingat){updatedProduct.arrivingat=arrivingat};
    if(arrivingDate){updatedProduct.arrivingDate=arrivingDate};
    //Find the sales order to be deleted
    let sproduct=await purchaseOrderMini.findById(req.params.id);
    if(!sproduct)
    {
        return res.status(404).send("The purchase product does not found");
    }
    if(sproduct.companyId !=companyId)
    {
        return res.status(404).send("Not Permited");
    }
    snewproduct=await purchaseOrderMini.findByIdAndUpdate(req.params.id, {$set: updatedProduct}, {new: true})
    
    //Code for changing the totalAmount in the purchaseOrder
    purchaseDetail= await purchaseOrder.findOne({companyId: companyId, purchaseOrderNum: sproduct.purchaseOrderNum});
    let temp=purchaseDetail.totalAmount+(quantity*perPicePrice)-(sproduct.quantity*sproduct.perPicePrice);
    await purchaseOrder.findOneAndUpdate({companyId: companyId, purchaseOrderNum: sproduct.purchaseOrderNum}, {$set:{totalAmount:temp}})

    //Making entry in logbook
    var currentdate=new Date();
    let statment="UserId:"+employeeId+" edited purchase order's product info having productNum:"+sproduct.productId+"And purchaseOrderNum:"+sproduct.purchaseOrderNum+" at "+currentdate.getDate() + "/"+ (currentdate.getMonth()+1)  + "/" + currentdate.getFullYear() + " @ "  + currentdate.getHours() + ":"  + currentdate.getMinutes() + ":" + currentdate.getSeconds();
    await CmpLogADetailBook.findOneAndUpdate({companyId: companyId},{$push:{comment: [statment]}})

    res.json({sproduct})
})

//CASE 7: Mangage Status Of Purchase Order Product i.e. warehouse name or num, tobe planned, tobe ordered/produced, tobe packed, tobe shiped
router.put("/managestatus/:id", fetchuser, async (req, res)=>{
    const {companyId, employeeId}=req.details;
    const {status, arrivingat}=req.body;
    const updatedProduct={};
    if(status){updatedProduct.status=status};
    {updatedProduct.arrivingat=arrivingat}
    //Find the purchase order to be deleted
    let sproduct=await purchaseOrderMini.findById(req.params.id);
    if(!sproduct)
    {
        return res.status(404).send("The purchase product does not found");
    }
    if(sproduct.companyId !=companyId)
    {
        return res.status(404).send("Not Permited");
    }
    sproduct=await purchaseOrderMini.findByIdAndUpdate(req.params.id, {$set: updatedProduct}, {new: true})
    
    //Making entry in logbook
    var currentdate=new Date();
    let statment="UserId:"+employeeId+" changed status of purchase order having purchaseOrderNum:"+sproduct.purchaseOrderNum+" to:"+status+" at "+currentdate.getDate() + "/"+ (currentdate.getMonth()+1)  + "/" + currentdate.getFullYear() + " @ "  + currentdate.getHours() + ":"  + currentdate.getMinutes() + ":" + currentdate.getSeconds();
    await CmpLogADetailBook.findOneAndUpdate({companyId: companyId},{$push:{comment: [statment]}})
    
    res.json({sproduct})
})

//CASE 8: Arrival of all purchase Order Endpoint, You have to also provide the document id, company id, sales order num
router.delete("/dispatchallorder/:id", fetchuser, async (req, res)=>{
    //Check first purchase order num and the companyId exists
    const {companyId, employeeId}=req.details;
    let orderidcheck=await purchaseOrder.findById(req.params.id);
    if(!orderidcheck)
    {
        return res.status(400).send({error: "The purchase order does not exists OR have been already been dispatched"})
    }
    //Find the purchase Order and delete order and its products
    //Allow the order to delete if user and company owns this order
    sorder=await purchaseOrder.findByIdAndDelete(req.params.id)
    await purchaseOrderMini.deleteMany({companyId: companyId, purchaseOrderNum: sorder.purchaseOrderNum})
    
    //Making entry in logbook
    var currentdate=new Date();
    let statment="UserId:"+employeeId+" approved arrival of purchase order having purchaseOrderNum:"+sorder.purchaseOrderNum+" at "+currentdate.getDate() + "/"+ (currentdate.getMonth()+1)  + "/" + currentdate.getFullYear() + " @ "  + currentdate.getHours() + ":"  + currentdate.getMinutes() + ":" + currentdate.getSeconds();
    await CmpLogADetailBook.findOneAndUpdate({companyId: companyId},{$push:{comment: [statment]}})
    
    //Add this in the history of the arrived Orders instead of deleting them
    return res.json({success: "purchase order has been arrived"})
})

module.exports=router