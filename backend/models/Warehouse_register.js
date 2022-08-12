const mongoose=require("mongoose");
const {Schema}=mongoose;

const newWarehouseSchema=new Schema({
    companyId:{
        type: Number,
        required: true,
    },
    wname:{
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
    country:{
        type: String,
        required: true,
    },
    pincode:{
        type: Number,
        required: true,
    },
    date:{
        type: Date,
        default: Date.now,
    },
    warehouseId:{
        type: Number,
        required: true,
    }
});

module.exports=mongoose.model("newWarehouse", newWarehouseSchema)