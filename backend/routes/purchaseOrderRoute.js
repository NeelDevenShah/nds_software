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
const ArrivedPurchaseOrder=require("../models/ArrivedPurchaseOrder");
const ArrivedPurchaseOrderMini=require("../models/ArrivedPurchaseOrderMini")
const AddProduct=require("../models/AddProduct")
const newproduct_registry=require("../models/newproduct_registry")

//CASE 1: Add new purchase order Endpoint
router.post("/addneworder", fetchuser, async (req, res)=>{
    const {companyId, employeeId}=req.details;
    let cmpcheck=await newCompany.findOne({companyId: companyId})
    if(!cmpcheck)
    {
        return res.send({error: "The company id does not exists"})
    }
    let purchaseOrderId=cmpcheck.nextpurchaseId
    await newCompany.findOneAndUpdate({companyId: companyId}, {$set: {nextpurchaseId: cmpcheck.nextpurchaseId+1}})

    req.body.companyId=companyId;
    req.body.purchaseOrderId=purchaseOrderId;
    const addpurchaseo=new purchaseOrder(req.body);
    await addpurchaseo.save();
    
    //Making entry in logbook
    var currentdate=new Date();
    let statment="UserId:"+employeeId+" created new purchase order having purchaseOrderId:"+purchaseOrderId+" for "+req.body.purchaseDealer+" at "+currentdate.getDate() + "/"+ (currentdate.getMonth()+1)  + "/" + currentdate.getFullYear() + " @ "  + currentdate.getHours() + ":"  + currentdate.getMinutes() + ":" + currentdate.getSeconds();
    await CmpLogADetailBook.findOneAndUpdate({companyId: companyId},{$push:{comment: [statment]}})
    res.send({success: "success"});
})
//CASE 2: Add new purchase product in purchase order Endpoint
router.post("/addpurchaseproduct/:id", fetchuser, fetchuser, async (req, res)=>{
    const {companyId, employeeId}=req.details;
    let cmpcheck=await newCompany.findOne({companyId: companyId})
    if(!cmpcheck)
    {
        return res.send({error: "The company id does not exists"})
    }
    let spcheck=await purchaseOrder.findById(req.params.id)
    if(!spcheck)
    {
        return res.send({error: "The entered purchase order Id does not exists"})
    }
    else
    {
        let sopcheck=await purchaseOrderMini.findOne({companyId: companyId, purchaseOrderId: spcheck.purchaseOrderId, productId: req.body.productId});
        if(sopcheck)
        {
            return res.send({error: "The product that you are trying to add in the purchase order already exists"})
        }
        else
        {
            //Now the main code for adding the new purchase order's product
            req.body.companyId=companyId;
            req.body.purchaseOrderId=spcheck.purchaseOrderId;
            const purchaseProduct=new purchaseOrderMini(req.body);
            await purchaseProduct.save();
            
            //Code for changing the totalAmount in the purchaseOrder
            let temp=spcheck.totalAmount+(req.body.quantity*req.body.perPicePrice);
            changeAmount=await purchaseOrder.findByIdAndUpdate(req.params.id, {$set:{totalAmount:temp}})
            
            //Making entry in logbook
            var currentdate=new Date();
            let statment="UserId:"+employeeId+" added new product for purchase order having purchaseOrderId:"+spcheck.purchaseOrderId+", ProductId:"+req.body.productId+" at "+currentdate.getDate() + "/"+ (currentdate.getMonth()+1)  + "/" + currentdate.getFullYear() + " @ "  + currentdate.getHours() + ":"  + currentdate.getMinutes() + ":" + currentdate.getSeconds();
            await CmpLogADetailBook.findOneAndUpdate({companyId: companyId},{$push:{comment: [statment]}})
            
            res.send({success: "success"});
        }
    }
})
//CASE 3: Delete Purchase Order Endpoint, You have to also provide the document id, company id, purchase order Id
router.delete("/deleteorder/:id", fetchuser, fetchuser, async (req, res)=>{
    const {companyId, employeeId}=req.details;
    let orderidcheck=await purchaseOrder.findById(req.params.id);
    if(!orderidcheck)
    {
        return res.send({error: "The purchase order does not exists"})
    }
    //Find the purchase Order and delete order and its products
    sorder=await purchaseOrder.findByIdAndDelete(req.params.id)
    await purchaseOrderMini.deleteMany({companyId: companyId, purchaseOrderId: sorder.purchaseOrderId})
    
    //Making entry in logbook
    var currentdate=new Date();
    let statment="UserId:"+employeeId+" deleted purchase order having purchaseOrderId:"+sorder.purchaseOrderId+" at "+currentdate.getDate() + "/"+ (currentdate.getMonth()+1)  + "/" + currentdate.getFullYear() + " @ "  + currentdate.getHours() + ":"  + currentdate.getMinutes() + ":" + currentdate.getSeconds();
    await CmpLogADetailBook.findOneAndUpdate({companyId: companyId},{$push:{comment: [statment]}})

    return res.send({success: "success"})
})

//CASE 4: Delete an prouct of the purchase order Endpoint
router.delete("/deleteproduct/:id", fetchuser, async (req, res)=>{
    const {companyId, employeeId}=req.details;
    let deleteprod=await purchaseOrderMini.findById(req.params.id);
    if(!deleteprod)
    {
        return res.send({error: "The product does not exists in the purchase order"});
    }
    deleteprod=await purchaseOrderMini.findByIdAndDelete(req.params.id);

    //Code for changing the totalAmount in the purchaseOrder
    purchaseOrderDet=await purchaseOrder.findOne({companyId:companyId, purchaseOrderId:deleteprod.purchaseOrderId});
    let temp=purchaseOrderDet.totalAmount-(deleteprod.quantity*deleteprod.perPicePrice)
    await purchaseOrder.findOneAndUpdate({companyId:companyId, purchaseOrderId:deleteprod.purchaseOrderId}, {$set:{totalAmount: temp}})
    
    //Making entry in logbook
    var currentdate=new Date();
    let statment="UserId:"+employeeId+" deleted product having productId:"+deleteprod.productId+" from purchase order having purchaseOrderId:"+deleteprod.purchaseOrderId+" at "+currentdate.getDate() + "/"+ (currentdate.getMonth()+1)  + "/" + currentdate.getFullYear() + " @ "  + currentdate.getHours() + ":"  + currentdate.getMinutes() + ":" + currentdate.getSeconds();
    await CmpLogADetailBook.findOneAndUpdate({companyId: companyId},{$push:{comment: [statment]}})

    res.send({success: "success"});
})

//CASE 5: Edit the purchase order's Information Endpoint
router.put("/editpurchaseorder/:id", fetchuser, async (req, res)=>{
    const {companyId, employeeId}=req.details;
    const {purchaseDealer, brokerName, paymentTerm, comment, mainArrivingDate}=req.body;
    const updatedPurchase={};
    if(brokerName){updatedPurchase.brokerName=brokerName};
    if(paymentTerm){updatedPurchase.paymentTerm=paymentTerm};
    if(comment){updatedPurchase.comment=comment};
    if(mainArrivingDate){updatedPurchase.mainArrivingDate=mainArrivingDate}
    let porder=await purchaseOrder.findById(req.params.id);
    if(!porder)
    {
        return res.send({error: "The purchase order does not found"});
    }
    if(porder.companyId !=companyId)
    {
        return res.send({error: "Not Permited"});
    }
    porder=await purchaseOrder.findByIdAndUpdate(req.params.id, {$set: updatedPurchase}, {new: true})
    
    //Making entry in logbook
    var currentdate=new Date();
    let statment="UserId:"+employeeId+" edited purchase order having purchaseOrderId:"+porder.purchaseOrderId+" at "+currentdate.getDate() + "/"+ (currentdate.getMonth()+1)  + "/" + currentdate.getFullYear() + " @ "  + currentdate.getHours() + ":"  + currentdate.getMinutes() + ":" + currentdate.getSeconds();
    await CmpLogADetailBook.findOneAndUpdate({companyId: companyId},{$push:{comment: [statment]}})
    
    res.send({success: "success"})
})

//CASE 6: Edit the purchase order's Product Information Endpoint
router.put("/editpurchaseproduct/:id", fetchuser, async (req, res)=>{
    const {companyId, employeeId}=req.details;
    const {quantity, perPicePrice}=req.body;
    const updatedProduct={};
    if(quantity){updatedProduct.quantity=quantity};
    if(perPicePrice){updatedProduct.perPicePrice=perPicePrice};

    let sproduct=await purchaseOrderMini.findById(req.params.id);
    if(!sproduct)
    {
        return res.send({error: "The purchase product does not found"});
    }
    if(sproduct.companyId !=companyId)
    {
        return res.send({error: "Not Permited"});
    }
    snewproduct=await purchaseOrderMini.findByIdAndUpdate(req.params.id, {$set: updatedProduct}, {new: true})
    
    //Code for changing the totalAmount in the purchaseOrder
    purchaseDetail= await purchaseOrder.findOne({companyId: companyId, purchaseOrderId: sproduct.purchaseOrderId});
    let temp=purchaseDetail.totalAmount-(sproduct.quantity*sproduct.perPicePrice)+(quantity*perPicePrice);
    await purchaseOrder.findOneAndUpdate({companyId: companyId, purchaseOrderId: sproduct.purchaseOrderId}, {$set:{totalAmount:temp}})

    //Making entry in logbook
    var currentdate=new Date();
    let statment="UserId:"+employeeId+" edited purchase order's product info having productId:"+sproduct.productId+"And purchaseOrderId:"+sproduct.purchaseOrderId+" at "+currentdate.getDate() + "/"+ (currentdate.getMonth()+1)  + "/" + currentdate.getFullYear() + " @ "  + currentdate.getHours() + ":"  + currentdate.getMinutes() + ":" + currentdate.getSeconds();
    await CmpLogADetailBook.findOneAndUpdate({companyId: companyId},{$push:{comment: [statment]}})

    res.send({success: "success"})
})

//CASE 7: Mangage Status Of Purchase Order Product i.e. warehouse name or Id, tobe planned, tobe ordered/produced, tobe packed, tobe shiped
router.put("/managestatus/:id", fetchuser, async (req, res)=>{
    const {companyId, employeeId}=req.details;
    const {status, arrivingat}=req.body;
    const updatedProduct={};
    if(status){updatedProduct.status=status};
    {updatedProduct.arrivingat=arrivingat}
    
    let sproduct=await purchaseOrderMini.findById(req.params.id);
    if(!sproduct)
    {
        return res.send({error: "The purchase product does not found"});
    }
    if(sproduct.companyId !=companyId)
    {
        return res.send({error: "Not Permited"});
    }
    sproduct=await purchaseOrderMini.findByIdAndUpdate(req.params.id, {$set: updatedProduct}, {new: true})
    
    //Making entry in logbook
    var currentdate=new Date();
    let statment="UserId:"+employeeId+" changed status of purchase order having purchaseOrderId:"+sproduct.purchaseOrderId+" to:"+status+" at "+currentdate.getDate() + "/"+ (currentdate.getMonth()+1)  + "/" + currentdate.getFullYear() + " @ "  + currentdate.getHours() + ":"  + currentdate.getMinutes() + ":" + currentdate.getSeconds();
    await CmpLogADetailBook.findOneAndUpdate({companyId: companyId},{$push:{comment: [statment]}})
    
    res.send({success: "success"})
})

//CASE 8: Arrival of all purchase Order Endpoint, You have to also provide the document id, company id, purchase order Id
router.delete("/dispatchallorder/:id", fetchuser, async (req, res)=>{
    const {companyId, employeeId}=req.details;
    let cmpcheck=await newCompany.findOne({companyId: companyId})
    if(!cmpcheck)
    {
        return res.send({error: "The Company Does Not Exists"})
    }
    let orderidcheck=await purchaseOrder.findById(req.params.id);
    if(!orderidcheck)
    {
        return res.send({error: "The purchase order does not exists OR have been already been dispatched"})
    }
  
    sorder=await purchaseOrder.findByIdAndDelete(req.params.id)

    // For Forwarding The Order To ArrivedOrder
    var currentDate1=new Date();
    dataForArrived={};
    {dataForArrived.companyId=sorder.companyId}
    {dataForArrived.purchaseOrderId=sorder.purchaseOrderId}
    {dataForArrived.purchaseDealer=sorder.purchaseDealer}
    {dataForArrived.brokerName=sorder.brokerName}
    {dataForArrived.paymentTerm=sorder.paymentTerm}
    {dataForArrived.comment=sorder.comment}
    {dataForArrived.totalAmount=sorder.totalAmount}
    
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

    {dataForArrived.ArrivedDate=dispatchDay + "/"+ dispatchMonth  + "/" + currentDate1.getFullYear()}
    const transfer=new ArrivedPurchaseOrder(dataForArrived);
    await transfer.save();

    do{
        socheck=await purchaseOrderMini.findOneAndDelete({companyId: companyId, purchaseOrderId: sorder.purchaseOrderId})
        if(socheck)
        {
            //For Forwarding The Order's Product To ArrivedOrderMini
            miniData={};
            {miniData.companyId=socheck.companyId}
            {miniData.purchaseOrderId=socheck.purchaseOrderId}
            {miniData.categoryId=socheck.categoryId}
            {miniData.categoryName=socheck.categoryName}
            {miniData.productId=socheck.productId}
            {miniData.productName=socheck.productName}
            {miniData.quantity=socheck.quantity}
            {miniData.perPicePrice=socheck.perPicePrice}
            {miniData.arrivedAt=socheck.arrivingat}
            const transferMini=new ArrivedPurchaseOrderMini(miniData);
            await transferMini.save();

            //For Adding The Order's Product To Existing Products Or Make New Product And Add it If Product Does Not Exists
            let productDetails=await newproduct_registry.findOne({companyId: socheck.companyId, categoryId: socheck.categoryId, productId: socheck.productId});
            if(productDetails)
            {
                //If It Exists Than Check In The Addproduct collection if exist at the particular warehouse or not
                //First writing code for the arriving at the 0 warehouse and than will make it extended to the all given array by help of the map
                let prodAtWareDetail=await AddProduct.findOne({companyId: socheck.companyId, categoryId: socheck.categoryId, productId: socheck.productId, prodWarehouseId: 0})
                if(prodAtWareDetail)
                {
                    //If product exists at particular warehouse than we will update it's quantity
                    prod=await AddProduct.findByIdAndUpdate(prodAtWareDetail._id, {$set:{quantity:prodAtWareDetail.quantity+socheck.quantity}})
                    await newproduct_registry.findByIdAndUpdate(productDetails._id, {$set: {quantity:productDetails.quantity+socheck.quantity}})
                }
                else{
                    //If it does not exists at given warehouse than we will make product at particular warehouse
                    //Adding New Product To Company's Warehouse
                    const newProdcutAtWareData={};
                    {newProdcutAtWareData.companyId=companyId};
                    {newProdcutAtWareData.categoryId=socheck.categoryId};
                    {newProdcutAtWareData.productcategory=socheck.categoryName};
                    {newProdcutAtWareData.productId=socheck.productId};
                    {newProdcutAtWareData.productName=socheck.productName};
                    {newProdcutAtWareData.quantity=socheck.quantity};
                    {newProdcutAtWareData.demand="New Product"};
                    {newProdcutAtWareData.predictedDemand=-1};
                    {newProdcutAtWareData.prodWarehouseId=0};

                    const newPrAtware=new AddProduct(newProdcutAtWareData);
                    await newPrAtware.save();

                    //Making change in the quantity and inwarehouses of the newProduct collection's document
                    await newproduct_registry.findByIdAndUpdate(productDetails._id, {$set: {quantity:productDetails.quantity+socheck.quantity, inWarehouses:productDetails.inWarehouses+1}})
                }
            }
            else{
                //If Product Does Not Exists

                //Adding new product to company's list i.e. newproduct_registry
                let newproductId=cmpcheck.nextproductId;
                await newCompany.findOneAndUpdate({companyId: companyId}, {$set:{nextproductId: cmpcheck.nextproductId+1}})

                let newProdDetail={};
                newProdDetail.companyId=companyId;
                newProdDetail.categoryId=socheck.categoryId;
                newProdDetail.productcategory=socheck.categoryName;
                newProdDetail.productId=newproductId;
                newProdDetail.productName=socheck.productName;
                newProdDetail.quantity=socheck.quantity;
                newProdDetail.demand="New Product";
                newProdDetail.predictedDemand="-1";
                newProdDetail.inWarehouses=1;

                const newprod=new newproduct_registry(newProdDetail);
                await newprod.save();

                //Adding New Product To Company's Warehouse
                const newProdcutAtWareData={};
                {newProdcutAtWareData.companyId=companyId};
                {newProdcutAtWareData.categoryId=socheck.categoryId};
                {newProdcutAtWareData.productcategory=socheck.categoryName};
                {newProdcutAtWareData.productId=newproductId};
                {newProdcutAtWareData.productName=socheck.productName};
                {newProdcutAtWareData.quantity=socheck.quantity};
                {newProdcutAtWareData.demand="New Product"};
                {newProdcutAtWareData.predictedDemand=-1};
                {newProdcutAtWareData.prodWarehouseId=0};

                const newPrAtware=new AddProduct(newProdcutAtWareData);
                await newPrAtware.save();
            }
        }
    }
    while(socheck)


    //Making entry in logbook
    var currentdate=new Date();
    let statment="UserId:"+employeeId+" approved arrival of purchase order having purchaseOrderId:"+sorder.purchaseOrderId+" at "+currentdate.getDate() + "/"+ (currentdate.getMonth()+1)  + "/" + currentdate.getFullYear() + " @ "  + currentdate.getHours() + ":"  + currentdate.getMinutes() + ":" + currentdate.getSeconds();
    await CmpLogADetailBook.findOneAndUpdate({companyId: companyId},{$push:{comment: [statment]}})
    
    //Add this in the history of the arrived Orders instead of deleting them
    return res.json({success: "success"})
})

//CASE 9: For Getting Order Details By Given Id
router.get("/getorderdetailbyid/:id", fetchuser, async(req, res)=>{
    let data=await purchaseOrder.findById(req.params.id);
    res.send(data);
})

//CASE 10: For Getting Order's Product Details By Given Id
router.get("/getproductdetailbyid/:id", fetchuser, async(req, res)=>{
    let data=await purchaseOrderMini.findById(req.params.id);
    res.send(data);
})

module.exports=router