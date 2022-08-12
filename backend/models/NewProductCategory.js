const mongoose=require("mongoose");
const {Schema}=mongoose;

const newProductCategorySchema=new Schema({
    companyId:{
        type: Number,
        required: true,
    },
    pcname:{
        type: String,
        required: true,
    },
    categoryId:{
        type: Number,
        required: true,
    },
    date:{
        type: Date,
        default: Date.now,
    },
});

module.exports=mongoose.model("newProductCategory", newProductCategorySchema)