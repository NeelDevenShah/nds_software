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
    password:{
        type: String,
        required: true,
    },
    employeeId:{
        type: Number,
        required: true,
    },
    accessLevel:{
        type: Number,
        required: true,
    },
    addedBy:{
        type: String,
        required: true,
    },
    branch:{
        type: String,
        required: true,
    },
    date:{
        type: Date,
        default:Date.now,
    }
});

module.exports=mongoose.model("companyUser", companyUserSchema)