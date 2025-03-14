const express = require("express");
const dotenv = require("dotenv").config();
const connectdb = require("./config/dbConnections");
const errorHandler = require("./middleware/errorHandler");
const cors = require('cors')


const app = express();
connectdb();
const port = process?.env?.PORT || 5000;

// const corsOptions = {
//   origin: 'https://example-client.com', // Allow only this origin
//   methods: ['GET', 'POST'],            // Allow only GET and POST methods
//   allowedHeaders: ['Content-Type'],    // Allow specific headers
// };

// app.use(cors(corsOptions));

app.use(express.json())
app.use(cors());
app.use("/api/products", require('./routes/getProducts'));
app.use("/api/cart", require('./routes/cart'));
app.use("/api/user", require('./routes/user'));
app.use(errorHandler)

app.listen(port, () => {
  console.log(`server running port ${port}`);
});