const connectToMongo=require('./db');
connectToMongo();

const express = require('express')
const port = 5000
//The above port can be changed as per requirment

//For cors
const app = express()
app.use(express.json())
const cors = require("cors")
app.use(cors())
app.use("/api/auth", require("./routes/auth"))
app.use("/api/getdata", require('./routes/getDataRouter'))
app.use("/api/doneorders", require("./routes/dispatchedAndArrivedRoute"))
app.use("/api/registry", require("./routes/registry"))
app.use("/api/addnew", require("./routes/addNew"))
app.use("/api/salesorder", require("./routes/salesOrderRoute"))
app.use("/api/purchaseorder", require("./routes/purchaseOrderRoute"))
app.use("/api/quotation", require("./routes/quotationRoute"))
app.use("/api/managestock", require("./routes/stockManageRoute"))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})