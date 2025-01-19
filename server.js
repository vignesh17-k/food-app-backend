const express = require("express");
const dotenv = require("dotenv").config();
const connectdb = require("./config/dbConnections");
const errorHandler = require("./middleware/errorHandler");

const app = express();
connectdb();
const port = process?.env?.PORT || 5000;

app.use(express.json())
app.use("/api/products", require('./routes/getProducts'));
app.use("/api/cart", require('./routes/cart'));
app.use("/api/user", require('./routes/user'));
app.use(errorHandler)

app.listen(port, () => {
  console.log(`server running port ${port}`);
});

