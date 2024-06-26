const mongoose=require("mongoose");
const {Schema}=mongoose;

const companyUserSchema=new Schema({
    companyId:{
        type: Number,
        required: true,
    },
    name:{
        type: String,
        required: true,
    },
    employeeId:{
        type: Number,
        required: true,
    },
    password:{
        type: String,
        required: true,
    }
});

module.exports=mongoose.model("companyUser", companyUserSchema)