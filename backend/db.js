const mongoose=require('mongoose');
const mongoURI="mongodb://localhost:27017/nds_software";

const connectToMongo=()=>{
    mongoose.connect(mongoURI, ()=>{
        console.log("Connected to database successfully")
    })
}

module.exports=connectToMongo;