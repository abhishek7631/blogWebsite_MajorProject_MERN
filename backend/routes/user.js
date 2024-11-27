const express = require("express");
const { register, login } = require("../controllers/user");

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

const restrictAdminAccess = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id); // Assuming req.user contains logged-in user info
    if (user.isAdmin) {
      return res
        .status(403)
        .json({ message: "Admins cannot access user panel." });
    }
    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Example route for user panel
router.get("/user-dashboard", restrictAdminAccess, (req, res) => {
  res.status(200).json({ message: "Welcome to the user dashboard." });
});

module.exports = router;
