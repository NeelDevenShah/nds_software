const mongoose=require("mongoose");
const {Schema}=mongoose;
const purchaseOrderSchema=new Schema({
    companyId:{
        type: Number,
        required: true,
    },
    purchaseOrderNum:{
        type: Number,
        required: true,
    },
    purchaseDealer:{
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
    mainArrivingDate:{
        type: Date,
        required: true,
    },
})

module.exports=mongoose.model("purchaseOrder", purchaseOrderSchema)