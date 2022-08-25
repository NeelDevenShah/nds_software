const mongoose=require("mongoose");
const {Schema}=mongoose;
const ArrivedPurchaseOrderSchema=new Schema({
    companyId:{
        type: Number,
        required: true,
    },
    purchaseOrderId:{
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
    ArrivedDate:{
        // In mm/dd/yyyy format
        type: String,
        required: true,
    }
})

module.exports=mongoose.model("ArrivedPurchaseOrder", ArrivedPurchaseOrderSchema)