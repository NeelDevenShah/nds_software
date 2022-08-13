const mongoose=require("mongoose");
const {Schema}=mongoose;

const quotationMiniSchema=new Schema({
    companyId:{
        type: Number,
        required: true,
    },
    quotationNum:{
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
        type    : Number,
        required: true,
    }
})

module.exports=mongoose.model("quotationMini", quotationMiniSchema)