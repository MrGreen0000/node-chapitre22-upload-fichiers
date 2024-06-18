const mongoose = require("mongoose");

exports.clientPromise = mongoose
  .connect("mongodb+srv://naji:naji1410@cluster0.2mlqv2t.mongodb.net/test", {})
  .then((client) => {
    console.log("Connected to MongoDB");
    return client;
  })
  .catch((err) => {
    console.log(err);
  });
