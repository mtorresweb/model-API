const jwt = require("jsonwebtoken");

const secretKey = "secretKey2024";

const generateToken = (payload) => {
  return jwt.sign(payload, secretKey, { expiresIn: "10d" });
};

module.exports = { generateToken, secretKey };
