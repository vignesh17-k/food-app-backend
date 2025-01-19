const mongoose = require("mongoose");
const url = process.env.CONNECTION_STRING;


const connectdb = async () => {
  try {
    const connect = await mongoose.connect(url);
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!",
      connect.connection.host,
      connect?.connection?.name
    );
  } catch(err) {
    console.log(err);
    process.exit(1)
  }
};

module.exports = connectdb;
