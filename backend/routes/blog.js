const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({ message: "This is get all Blog route" });
});

router.get("/:id", (req, res) => {
  res.status(200).json({ message: "This is get specific route" });
});
