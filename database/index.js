const mongoose = require("mongoose");

// Connection URL for the MongoDB Docker instance
const url = "mongodb://localhost:27017/breedClassifier";

async function connection() {
  try {
    await mongoose.connect(url);
    console.log("successfully connected to MongoDB");
  } catch (err) {
    console.log("error connecting to MongoDB database");
    console.log(err);
  }
}

module.exports = connection;
