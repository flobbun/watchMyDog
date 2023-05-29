const jwt = require("jsonwebtoken");
const env = require("../env.cjs");

const verifyToken = (token) => {
  try {
    return jwt.verify(token, env.JWT_SECRET);
  } catch (error) {
    return false;
  }
};

const signToken = () =>
  jwt.sign(
    {
      password: env.PASSWORD,
    },
    env.JWT_SECRET,
    {
      expiresIn: "1d",
    }
  );

module.exports = {
  verifyToken,
  signToken,
};