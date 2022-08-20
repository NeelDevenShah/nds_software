const mongoose=require("mongoose");
const {Schema}=mongoose;

const salesMiniSchema=new Schema({
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
    dispatchingFrom:[Number],
    dispatchDate:{
        type: Date,
        required: true,
    },
})

module.exports=mongoose.model("salesMini", salesMiniSchema)