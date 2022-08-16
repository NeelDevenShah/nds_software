const mongooes=require("mongoose");
const {Schema}=mongooes

const logBookSchema=new Schema({
    companyId:{
        type: Number,
        required: true
    },
    comment:[String],
});

module.exports=mongooes.model("logBook", logBookSchema)