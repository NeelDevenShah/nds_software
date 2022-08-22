const mongoose=require("mongoose");
const {Schema}=mongoose;

const newWarehouseSchema=new Schema({
    companyId:{
        type: Number,
    },
    warehouseId:{
        type: Number,
    },
    wname:{
        type: String,
    },
    shopNum:{
        type: String,
    },
    add2:{
        type: String,
    },
    city:{
        type: String,
    },
    state:{
        type: String,
    },
    country:{
        type: String,
    },
    pincode:{
        type: Number,
    }
});

module.exports=mongoose.model("newWarehouse", newWarehouseSchema)