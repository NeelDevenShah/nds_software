const mongoose=require("mongoose");
const {Schema}=mongoose;

const DispatchedSalesOrderMiniSchema=new Schema({
    companyId:{
        type: Number,
        required: true,
    },
    SalesOrderId:{
        type: Number,
        required: true,
    },
    categoryId:{
        type: Number,
        required: true,
    },
    categoryName:{
        type: String,
        required: true,
    },
    productId:{
        type: Number,
        required: true,
    },
    productName:{
        type: String,
        required: true,
    },
    quantity:{
        type: Number,
        required: true,
    },
    perPicePrice:{
        type: Number,
        required: true,
    },
    dispatchedFrom:[Number],
})

module.exports=mongoose.model("DispatchedSalesOrderMini", DispatchedSalesOrderMiniSchema)