const express = require("express");
const router = express.Router();
const User = require("../models/userModel.js");
const jwt = require("jsonwebtoken");

function createToken(_id) {
  return jwt.sign({ _id }, process.env.SECRET);
}

router.post("/signup", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.signup(username, password);
    const token = createToken(user._id);
    res.status(200).json({ username, token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.login(username, password);
    const token = createToken(user._id);
    res.status(200).json({ username, token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
