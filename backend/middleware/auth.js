const jwt = require("jsonwebtoken");
const User = require("../models/user");

exports.auth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    if (!token) return res.status(400).json({ message: "Token is missing" });

    const decode = jwt.verify(token, process.env.secret_key);

    req.user = decode;

    next();
  } catch (error) {
    res.status(400).json({ message: error });
  }
};
