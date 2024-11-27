const User = require("../models/user");

// Middleware to check if the user is an admin
const adminAuth = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id); // Assuming req.user contains the logged-in user's ID
    if (!user || !user.isAdmin) {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }
    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = adminAuth;
