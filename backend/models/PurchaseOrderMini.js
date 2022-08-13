const mongoose=require("mongoose");
const {Schema}=mongoose;

const purchaseMiniSchema=new Schema({
    companyId:{
        type: Number,
        required: true,
    },
    purchaseOrderNum:{
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
    status:{
        type: String,
        required: true,
    },
    arrivingat:{
        type: String,
        required: true,
    },
    arrivingDate:{
        type: Date,
        required: true,
    },
})

module.exports=mongoose.model("purchaseMini", purchaseMiniSchema)