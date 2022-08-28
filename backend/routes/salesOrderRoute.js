const express=require("express");
const router=express.Router();
const {body, validationResult}=require("express-validator");
const newCompany=require("../models/Company_registry");
const companyUser=require("../models/CompanyUser")
const salesOrder=require("../models/SalesOrder");
const salesOrderMini=require("../models/SalesOrderMini");
const CmpLogADetailBook=require("../models/CmpLogADetailBook")
const fetchcompany=require("../middleware/fetchcompany");
const fetchuser=require("../middleware/fetchuser");
const SalesOrderMini = require("../models/SalesOrderMini");
const DispatechedSalesOrder=require("../models/DispatechedSalesOrder");
const DispatchedSalesOrderMini=require("../models/DispatchedSalesOrderMini");
const newproduct_registry = require("../models/newproduct_registry");
const AddProduct = require("../models/AddProduct");

//CASE 1: Add new sales order Endpoint
router.post("/addneworder", fetchuser, async (req, res)=>{
    const {companyId, employeeId}=req.details;
    let cmpcheck=await newCompany.findOne({companyId: companyId})
    if(!cmpcheck)
    {
        return res.send({error: "The company id does not exists"})
    }
    let SalesOrderId=cmpcheck.nextsalesId;
    await newCompany.findOneAndUpdate({companyId: companyId}, {$set: {nextsalesId: cmpcheck.nextsalesId+1}})

    req.body.companyId=companyId;
    req.body.SalesOrderId=SalesOrderId
    const addsaleso=new salesOrder(req.body);
    await addsaleso.save();
     //Making entry in loogbook
     var currentdate=new Date();
     let statment="userId:"+employeeId+" created new sales order having SalesOrderId:"+SalesOrderId+" for "+req.body.salesDealer+" at "+currentdate.getDate() + "/"+ (currentdate.getMonth()+1)  + "/" + currentdate.getFullYear() + " @ "  + currentdate.getHours() + ":"  + currentdate.getMinutes() + ":" + currentdate.getSeconds();;
     await CmpLogADetailBook.findOneAndUpdate({companyId: companyId},{$push:{comment: [statment]}})
    
    res.send({success: "success"});
})
//CASE 2: Add new sales product in sales order Endpoint
router.post("/addsalesorderproduct/:id", fetchuser, async (req, res)=>{
    const {companyId, employeeId}=req.details;
    let cmpcheck=await newCompany.findOne({companyId: companyId})
    if(!cmpcheck)
    {
        return res.send({error: "The company id does not exists"})
    }
    let spcheck=await salesOrder.findById(req.params.id)
    if(!spcheck)
    {
        return res.send({error: "The entered sales order num does not exists"})
    }
    else
    {
        let sopcheck=await salesOrderMini.findOne({companyId: companyId, SalesOrderId: spcheck.SalesOrderId, productId: req.body.productId});
        if(sopcheck)
        {
            return res.send({error: "The product that you are trying to add in the sales order already exists"})
        }
        else
        {
            //Now the main code for adding the new sales order's product
            req.body.companyId=companyId;
            req.body.SalesOrderId=spcheck.SalesOrderId;
            req.body.status="To Be Planned";
            req.body.dispatchDate="00/00/0000"
            const salesProduct=new salesOrderMini(req.body);
            await salesProduct.save();
            
            //Code for changing the totalAmount in the SalesOrder
            let temp=spcheck.totalAmount+(req.body.quantity*req.body.perPicePrice);
            changeAmount=await salesOrder.findByIdAndUpdate(req.params.id, {$set:{totalAmount:temp}})

            //Making entry in loogbook
            var currentdate=new Date();
            let statment="UserId:"+employeeId+" added new product to salesOrder having SalesOrderId:"+spcheck.SalesOrderId+" having productId:"+req.body.productId+" at "+currentdate.getDate() + "/"+ (currentdate.getMonth()+1)  + "/" + currentdate.getFullYear() + " @ "  + currentdate.getHours() + ":"  + currentdate.getMinutes() + ":" + currentdate.getSeconds();;
            await CmpLogADetailBook.findOneAndUpdate({companyId: companyId},{$push:{comment: [statment]}})
            
            res.send({success: "success"});
        }
    }
})
//CASE 3: Delete Sales Order Endpoint, You have to also provide the document id, company id, sales order num
router.delete("/deleteorder/:id", fetchuser, async (req, res)=>{
    const {companyId, employeeId}=req.details;
    let orderidcheck=await salesOrder.findById(req.params.id);
    if(!orderidcheck)
    {
        return res.send({error: "The sales order does not exists"})
    }
    try
    {
        //Allow the order to delete if user and company owns this order
        sorder=await salesOrder.findByIdAndDelete(req.params.id)
        const {SalesOrderId}=sorder;
        await salesOrderMini.deleteMany({companyId: companyId, SalesOrderId: SalesOrderId})
        
        //Making entry in loogbook
        var currentdate=new Date();
        let statment="UserId:"+employeeId+" deleted sales order of SalesOrderId:"+SalesOrderId+" at "+currentdate.getDate() + "/"+ (currentdate.getMonth()+1)  + "/" + currentdate.getFullYear() + " @ "  + currentdate.getHours() + ":"  + currentdate.getMinutes() + ":" + currentdate.getSeconds();;
        await CmpLogADetailBook.findOneAndUpdate({companyId: companyId},{$push:{comment: [statment]}})
        
        return res.json({success: "success"})
    }
    catch(error)
    {
        res.send({error: "Internal Server Error"});
    }
})

//CASE 4: Delete an prouct of the sales order Endpoint
router.delete("/deleteproduct/:id", fetchuser, async (req, res)=>{
    const {companyId, employeeId}=req.details;
    let deleteprod=await salesOrderMini.findById(req.params.id);
    if(!deleteprod)
    {
        return res.send({error: "The product does not exists in the sales order"});
    }
    orderProductCheck=await salesOrderMini.findByIdAndDelete(req.params.id);
    const {SalesOrderId, productId}=orderProductCheck
    
    //Code for changing the totalAmount in the salesOrder
    salesOrderDet=await salesOrder.findOne({companyId:companyId, SalesOrderId:deleteprod.SalesOrderId});
    let temp=salesOrderDet.totalAmount-(deleteprod.quantity*deleteprod.perPicePrice)
    await salesOrder.findOneAndUpdate({companyId:companyId, SalesOrderId:deleteprod.SalesOrderId}, {$set:{totalAmount: temp}})

    //Making entry in loogbook
    var currentdate=new Date();
    let statment="UserId:"+employeeId+" deleted Product having productId:"+productId+" from sales order having SalesOrderId:"+SalesOrderId+" at "+currentdate.getDate() + "/"+ (currentdate.getMonth()+1)  + "/" + currentdate.getFullYear() + " @ "  + currentdate.getHours() + ":"  + currentdate.getMinutes() + ":" + currentdate.getSeconds();;
    await CmpLogADetailBook.findOneAndUpdate({companyId: companyId},{$push:{comment: [statment]}})

    res.send({success: "success"});
})

//CASE 5: Edit the sales order's Information Endpoint
router.put("/editsalesorder/:id", fetchuser, async (req, res)=>{
    const {companyId, employeeId}=req.details;
    const {brokerName, paymentTerm, comment, mainDispatchDate}=req.body;
    const updatedSales={};
    if(brokerName){updatedSales.brokerName=brokerName};
    if(paymentTerm){updatedSales.paymentTerm=paymentTerm};
    if(comment){updatedSales.comment=comment};
    if(mainDispatchDate){updatedSales.mainDispatchDate=mainDispatchDate};
    let sorder=await salesOrder.findById(req.params.id);
    if(!sorder)
    {
        return res.send({error: "The sales order does not found"});
    }
    if(sorder.companyId !=companyId)
    {
        return res.send({error: "Not Permited"});
    }
    sorder=await salesOrder.findByIdAndUpdate(req.params.id, {$set: updatedSales}, {new: true})
    
    //Making entry in loogbook
    var currentdate=new Date();
    let statment="UserId:"+employeeId+" edited sales order information having SalesOrderId:"+sorder.SalesOrderId+" at "+currentdate.getDate() + "/"+ (currentdate.getMonth()+1)  + "/" + currentdate.getFullYear() + " @ "  + currentdate.getHours() + ":"  + currentdate.getMinutes() + ":" + currentdate.getSeconds();;
    await CmpLogADetailBook.findOneAndUpdate({companyId: companyId},{$push:{comment: [statment]}})
    
    res.send({success: "success"})
})

//CASE 6: Edit the sales order's Product Information Endpoint
router.put("/editsalesproduct/:id", fetchuser, async (req, res)=>{
    const {companyId, employeeId}=req.details;
    const {quantity, perPicePrice}=req.body;
    const updatedProduct={};
    if(quantity){updatedProduct.quantity=quantity};
    if(perPicePrice){updatedProduct.perPicePrice=perPicePrice};
    let sproduct=await salesOrderMini.findById(req.params.id);
    if(!sproduct)
    {
        return res.send({error: "The sales product does not found"});
    }
    if(sproduct.companyId !=companyId)
    {
        return res.send({error: "Not Permited"});
    }
    let sproduct1=await salesOrderMini.findByIdAndUpdate(req.params.id, {$set: updatedProduct})
    
    //Code for changing the totalAmount in the salesOrder
    let salesDetail= await salesOrder.findOne({companyId: companyId, SalesOrderId: sproduct.SalesOrderId});
    let temp=salesDetail.totalAmount+(quantity*perPicePrice)-(sproduct.quantity*sproduct.perPicePrice);
    await salesOrder.findOneAndUpdate({companyId: companyId, SalesOrderId: sproduct.SalesOrderId}, {$set:{totalAmount:temp}})

    //Making entry in logbook
    var currentdate=new Date();
    let statment="UserId:"+employeeId+" edited details of product having productId:"+sproduct.productId+" of sales order having SalesOrderId:"+sproduct.SalesOrderId+" at "+currentdate.getDate() + "/"+ (currentdate.getMonth()+1)  + "/" + currentdate.getFullYear() + " @ "  + currentdate.getHours() + ":"  + currentdate.getMinutes() + ":" + currentdate.getSeconds();;
    await CmpLogADetailBook.findOneAndUpdate({companyId: companyId},{$push:{comment: [statment]}})
    
    res.send({success: "success"})
})

//CASE 7: Mangage Status Of Sales Order's product i.e. warehouse name or num, tobe planned, tobe ordered/produced, tobe packed, tobe shiped
router.put("/managestatus/:id", fetchuser, async (req, res)=>{
    const {companyId, employeeId}=req.details;
    temp=await salesOrderMini.findById(req.params.id)
    const {SalesOrderId, salesDealer, brokerName, productId, productName, quantity, perPicePrice, dispatchingFrom, dispatchDate, categoryId, categoryName}=temp;
    const updatedProduct={};
    if(companyId){updatedProduct.companyId=companyId};
    if(SalesOrderId){updatedProduct.SalesOrderId=SalesOrderId};
    if(categoryId){updatedProduct.salesDealer=categoryId};
    if(categoryName){updatedProduct.categoryName=categoryName};
    if(productId){updatedProduct.productId=productId};
    if(productName){updatedProduct.productName=productName};
    if(quantity){updatedProduct.quantity=quantity};
    if(perPicePrice){updatedProduct.perPicePrice=perPicePrice};
    if(dispatchingFrom){updatedProduct.dispatchingFrom=req.body.dispatchingFrom};
    if(dispatchDate){updatedProduct.dispatchDate=dispatchDate};
    let sproduct=await salesOrderMini.findById(req.params.id);
    if(!sproduct)
    {
        return res.send({error: "The sales product does not found"});
    }
    if(sproduct.companyId !=companyId)
    {
        return res.send({error: "Not Permited"});
    }
    sproduct=await salesOrderMini.findByIdAndUpdate(req.params.id, {$set: updatedProduct}, {new: true})
    
    //Making entry in logbook
    var currentdate=new Date();
    let statment="UserId:"+employeeId+" changed status of sales order's product having productId:"+productId+" of SalesOrderId:"+SalesOrderId+" at "+currentdate.getDate() + "/"+ (currentdate.getMonth()+1)  + "/" + currentdate.getFullYear() + " @ "  + currentdate.getHours() + ":"  + currentdate.getMinutes() + ":" + currentdate.getSeconds();;
    await CmpLogADetailBook.findOneAndUpdate({companyId: companyId},{$push:{comment: [statment]}})
    
    res.send({success: "success"})
})

//CASE 8: Dispatch Sales Order Endpoint, You have to also provide the document id, company id, sales order num
router.delete("/dispatchallorder/:id", fetchuser, async (req, res)=>{

    let ErrorNum=0;
    const {companyId, employeeId}=req.details;
    let cmpcheck=await newCompany.findOne({companyId: companyId})
    if(!cmpcheck)
    {
        ErrorNum=1;
        return res.send({error: "The Company Does Not Exists"})
    }
    let orderidcheck=await salesOrder.findById(req.params.id);
    if(!orderidcheck)
    {
        ErrorNum=1;
        return res.send({error: "The sales order does not exists OR have been already been dispatched"})
    }
    //Checking Wheather The Order and it's product Exists in sufficient quantity or not
    sorder=await salesOrder.findById(req.params.id)    
    productOfSalesOrder=await salesOrderMini.find({companyId: sorder.companyId, SalesOrderId: sorder.SalesOrderId})

    let checkRoundCount=0, header=0;
    await productOfSalesOrder.map(async(data)=>{
            //For Checking It the quantity required for sales order is in stock or not
            let productDetails=await newproduct_registry.findOne({companyId: data.companyId, categoryId: data.categoryId, productId: data.productId})
            if(productDetails && productDetails.quantity!=0)
            {
                //Check If Product Exists Or Not In Particular Warehouse, For Now It Is Only default One i.e. 0
                let prodAtWareDetail=await AddProduct.findOne({companyId: data.companyId, categoryId: data.categoryId, productId: data.productId, prodWarehouseId: 0})
                if(prodAtWareDetail)
                {
                    if(prodAtWareDetail.quantity<data.quantity)
                    {
                        ErrorNum=1;
                        checkRoundCount++;
                        if(header==0)
                        {
                            header=1;
                            return res.send({error: "The quantity is not in the sufficient quantity, to make disptch from warehouse"})
                        }
                    }
                    else
                    {
                        checkRoundCount++;
                        //For Making Update in data of company
                        updateRoundCount=0;
                        if(checkRoundCount==productOfSalesOrder.length &&ErrorNum==0)
                        {
                            productOfSalesOrder.map(async(data)=>{
                                let prodAtAllWarehouse=await newproduct_registry.findOne({companyId: data.companyId, categoryId: data.categoryId, productId: data.productId})
                                let prodAtParticularWare=await AddProduct.findOne({companyId: data.companyId, categoryId: data.categoryId, productId: data.productId, prodWarehouseId: 0})
                                if(prodAtAllWarehouse)
                                {
                                    if(prodAtParticularWare.quantity>data.quantity)
                                    {
                                        await AddProduct.findByIdAndUpdate(prodAtParticularWare._id, {$set:{quantity: (prodAtParticularWare.quantity-data.quantity)}});
                                        await newproduct_registry.findByIdAndUpdate(prodAtAllWarehouse._id, {$set:{quantity: (prodAtAllWarehouse.quantity-data.quantity)}})
                                    }
                                    else if(prodAtParticularWare.quantity==data.quantity)
                                    {
                                        await AddProduct.findByIdAndDelete(prodAtParticularWare._id);
                                        await newproduct_registry.findByIdAndUpdate(prodAtAllWarehouse._id, {$set:{quantity: (prodAtAllWarehouse.quantity-data.quantity), inWarehouses: prodAtAllWarehouse.inWarehouses-1}})
                                    }
                                
                                    //For Forwarding The Order's Product To DispatchedOrderMini
                                    socheck=await salesOrderMini.findByIdAndDelete(data._id)
                                    miniData={};
                                    {miniData.companyId=socheck.companyId}
                                    {miniData.SalesOrderId=socheck.SalesOrderId}
                                    {miniData.categoryId=socheck.categoryId}
                                    {miniData.categoryName=socheck.categoryName}
                                    {miniData.productId=socheck.productId}
                                    {miniData.productName=socheck.productName}
                                    {miniData.quantity=socheck.quantity}
                                    {miniData.perPicePrice=socheck.perPicePrice}
                                    {miniData.dispatchedFrom=socheck.dispatchingFrom}
                                    const transferMini=new DispatchedSalesOrderMini(miniData);
                                    await transferMini.save();
                                    updateRoundCount++;
                                
                                    if(updateRoundCount==productOfSalesOrder.length)
                                    {
                                        // For Forwarding The Order To DispatchedOrder
                                        sorder=await salesOrder.findByIdAndDelete(req.params.id)
                                        var currentDate1=new Date();
                                        dataForDispatch={};
                                        {dataForDispatch.companyId=sorder.companyId}
                                        {dataForDispatch.SalesOrderId=sorder.SalesOrderId}
                                        {dataForDispatch.salesDealer=sorder.salesDealer}
                                        {dataForDispatch.brokerName=sorder.brokerName}
                                        {dataForDispatch.paymentTerm=sorder.paymentTerm}
                                        {dataForDispatch.comment=sorder.comment}
                                        {dataForDispatch.totalAmount=sorder.totalAmount}
                                        let dispatchDay=currentDate1.getDate()+"";
                                        let dispatchMonth=(currentDate1.getMonth()+1)+"";
                                        if(dispatchDay.length==1)
                                        {
                                            dispatchDay='0'+dispatchDay;
                                        }
                                        if(dispatchMonth.length==1)
                                        {
                                            dispatchMonth='0'+dispatchMonth;
                                        }
                                        {dataForDispatch.DispatchedAt=dispatchDay + "/"+ dispatchMonth  + "/" + currentDate1.getFullYear()}
                                        const transfer=new DispatechedSalesOrder(dataForDispatch);
                                        await transfer.save();
                                    
                                        //Making entry in logbook
                                        var currentdate=new Date();
                                        let statment="UserId:"+employeeId+" dispatched sales order having salesorderId:"+sorder.SalesOrderId+" at "+currentdate.getDate() + "/"+ (currentdate.getMonth()+1)  + "/" + currentdate.getFullYear() + " @ "  + currentdate.getHours() + ":"  + currentdate.getMinutes() + ":" + currentdate.getSeconds();;
                                        await CmpLogADetailBook.findOneAndUpdate({companyId: companyId},{$push:{comment: [statment]}})
                                    
                                        return res.send({success: "success"})
                                    }
                                }
                                else
                                {
                                    ErrorNum=1;
                                    updateRoundCount++;
                                    return res.send({error: "The Product Does Not Exists At Particular Warehouse"})
                                }
                            })
                        }
                    }
                }
                else
                {
                    ErrorNum=1;
                    checkRoundCount++;
                    if(header==0)
                    {
                        header=1;
                        return res.send({error: "Product Does Not Exists In Given Warehouse Or the quantity is less than the order's quantity"})
                    }
                }
            }
            else
            {
                ErrorNum=1;
                checkRoundCount++;
                if(header==0)
                {
                    header=1;
                    return res.json({error: "Product Does Not Exists, Please Make Sure Product Exists In The Godown"})
                }
            }
        })
})

//CASE 9: Get Details Of Given id of Sales Document
router.get("/getorderdetails/:id", fetchuser, async (req, res)=>{
    let data=await salesOrder.findById(req.params.id)
    res.send(data);
})

//CASE 10: Get Product Details Of Givem Id Of Sales Order
router.get("/getproductdetails/:id", fetchuser, async (req, res)=>{
    let data=await SalesOrderMini.findById(req.params.id)
    res.send(data);
})

module.exports=router