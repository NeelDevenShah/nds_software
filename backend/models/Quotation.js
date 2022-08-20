const mongoose=require("mongoose");
const {Schema}=mongoose;
const quotationSchema=new Schema({
    companyId:{
        type: Number,
        required: true,
    },
    quotationId:{
        type: Number,
        required: true,
    },
    dealer:{
        type: String,
        required: true,
    },
    totalAmount:{
        type: Number,
        required: true,
    }
})

module.exports=mongoose.model("quotation", quotationSchema)