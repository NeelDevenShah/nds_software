//User check in all of the endpoints are remaining

const connectToMongo=require('./db');
connectToMongo();

const express = require('express')
const app = express()
const port = 5000

app.use(express.json())
// app.use("/api/auth", require("./routes/auth"))
app.use("/api/registry", require("./routes/registry"))
app.use("/api/addnew", require("./routes/addNew"))
app.use("/api/salesorder", require("./routes/salesOrderRoute"))
app.use("/api/purchaseorder", require("./routes/purchaseOrderRoute"))
app.use("/api/quotation", require("./routes/quotationRoute"))
app.use("/api/managestock", require("./routes/stockManageRoute"))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})