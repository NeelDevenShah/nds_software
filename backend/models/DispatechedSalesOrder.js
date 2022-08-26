const mongoose=require("mongoose");
const {Schema}=mongoose;
const DispatechedSalesOrderSchema=new Schema({
    companyId:{
        type: Number,
        required: true,
    },
    SalesOrderId:{
        type: Number,
        required: true,
    },
    salesDealer:{
        type: String,
        required: true,
    },
    brokerName:{
        type: String,
        required: true,
    },
    paymentTerm:{
        type: String,
        required: true,
    },
    comment:{
        type: String
    },
    totalAmount:{
        type: Number,
        required: true,
    },
    DispatchedAt:{
        // In mm/dd/yyyy format
        type: String,
        required: true,
    },
})

module.exports=mongoose.model("DispatechedSalesOrder", DispatechedSalesOrderSchema)