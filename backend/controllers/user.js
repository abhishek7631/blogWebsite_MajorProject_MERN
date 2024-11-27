const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const hashPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, password: hashPassword });
    res.status(200).json({ message: "User Register Succesfully" });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User Not Found" });

    const compare = await bcrypt.compare(password, user.password);

    if (!compare) return res.status(400).json({ message: "Wrong Password" });

    const token = jwt.sign({ id: user._id }, process.env.secret_key, {
      expiresIn: "30d",
    });

    res.status(200).json({ message: "User Login Successfully", token });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};
