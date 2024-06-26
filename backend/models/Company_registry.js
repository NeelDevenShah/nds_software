const mongoose=require("mongoose");
const {Schema}=mongoose;
const newCompanySchema=new Schema({
    name:{
        type: String,
        required: true,
    },
    emailId:{
        type: String,
        required: true,
    },
    country:{
        type: String,
        required: true,
    },
    shopNum:{
        type: String,
        required: true,
    },
    add2:{
        type: String,
        required: true,
    },
    city:{
        type: String,
        required: true,
    },
    state:{
        type: String,
        required: true,
    },
    pincode:{
        type: Number,
        required: true,
    },
    companyId:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },
    nextEmployeeId:{
        type: Number,
        default: 1
    },
    nextwareId:{
        type: Number,
        default: 1
    },
    nextcatId:{
        type: Number,
        default: 1
    },
    nextquotationId:{
        type: Number,
        default: 1
    },
    nextpurchaseId:{
        type: Number,
        default: 1
    },
    nextsalesId:{
        type: Number,
        default: 1
    },
    nextproductId:{
        type: Number,
        default: 1
    }
});

module.exports=mongoose.model("newCompany", newCompanySchema)