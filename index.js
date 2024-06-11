const express = require("express");
const cors = require("cors");
require("express-async-errors");
const sequelize = require("./database/index.js");
const { errorHandler } = require("./middlewares/errorHandler.js");
require("./models/pet.js");
require("./models/user.js");

const modelRouter = require("./routes/model.js");
const userRouter = require("./routes/user.js");
const petRouter = require("./routes/pet.js");

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
app.use("/user", userRouter);
app.use("/pet", petRouter);

//Error middleware
app.use(errorHandler);

// Initializes the server
const main = async () => {
  try {
    await sequelize.sync({ force: false });
    app.listen(port, () => console.log(`App listening on port ${port}`));
  } catch (error) {
    console.log("could not start server", error);
  }
};

main();
