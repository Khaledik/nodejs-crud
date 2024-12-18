const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/demo-node")
  .then((res) => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error conecting to MongoDB", error);
  });

module.exports = mongoose;
