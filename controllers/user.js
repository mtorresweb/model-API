const User = require("../models/user");
const bcrypt = require("bcrypt");
const { generateToken } = require("../helpers/jwt.js");

const signup = async (req, res) => {
  const userData = req.body;

  const userExists = await User.findOne({ where: { email: userData.email } });
  if (userExists)
    return res
      .status(400)
      .send({ error: true, message: "User already exists" });

  console.log(userData);
  userData.password = await bcrypt.hash(userData.password, 14);
  const newUser = await User.create(userData);

  delete userData.password;
  userData.id = newUser.id;

  return res.status(200).send({
    error: false,
    message: "User registered successfully",
    user: { ...userData, token: generateToken(userData) },
  });
};

const logIn = async (req, res) => {
  const userData = req.body;

  //Checks if the user exists
  const user = await User.findOne({
    where: { email: userData.email },
  });

  // Checks if the passsword matches the stored one
  let passwordMatch = false;
  if (user) {
    passwordMatch = await bcrypt.compare(userData.password, user.password);
  }

  if (!passwordMatch || !user)
    return res
      .status(400)
      .send({ error: true, message: "Incorrect email or password" });

  let userToReturn = {
    id: user.id,
    name: user.name,
    email: user.email,
  };

  userToReturn.token = generateToken(userToReturn);

  return res.status(200).send({
    error: false,
    message: "Logged in successfully",
    user: userToReturn,
  });
};

module.exports = { signup, logIn };
