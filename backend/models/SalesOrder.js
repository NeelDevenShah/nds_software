const mongoose=require("mongoose");
const {Schema}=mongoose;
const salesOrderSchema=new Schema({
    companyId:{
        type: Number,
        required: true,
    },
    SalesOrderNum:{
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
        type: String,
        required: true,
    },
    totalAmount:{
        type: Number,
        required: true,
    },
    mainDispatchDate:{
        type: Date,
        required: true,
    },
})

module.exports=mongoose.model("salesOrder", salesOrderSchema)