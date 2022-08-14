const mongooes=require("mongoose");
const {Schema}=mongooes

const logBookSchema=new Schema({
    companyId:{
        type: Number,
        required: true
    },
    userId:{
        type: Number,
        required: true
    },
    comment:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    }
});

module.exports=mongooes.model("logBook", logBookSchema)