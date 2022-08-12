const mongoose=require("mongoose");
const {Schema}=mongoose;

const newProductSchema=new Schema({
    companyId:{
        type: Number,
        required: true,
    },
    categoryId:{
        type: Number,
        required: true,
    },
    productcategory:{
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
    demand:{
        type: String,
        required: true,
    },
    predictedDemand:{
        type: Number,
        required: true,
    },
    inWarehouses:{
        type: Number,
        required: true,
    }
})

module.exports=mongoose.model("newProduct", newProductSchema)