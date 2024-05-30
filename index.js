const express = require("express");
const { modelRouter, uploads } = require("./routes/model.js");
const multer = require("multer");
const cors = require("cors");
const connection = require("./database/index.js");
require("./models/user.js");
require("./models/pet.js");

const app = express();
const port = 3000;

app.use(
  cors({
    origin: "*",
  }),
);

//allowed data types
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use the model router
app.use("/model", modelRouter);
app.use("/", (req, res) => {
  res.send("Welcome to the model API");
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  connection();
});
