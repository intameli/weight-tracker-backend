const express = require("express");
const router = express.Router();
const Settings = require("../models/settingsModel.js");
const requireAuth = require("../requireAuth.js");

router.use(requireAuth);

router.get("/", async (req, res) => {
  try {
    const user = req.user._id;
    const settings = await Settings.findOne({ user });
    res.status(200).json(settings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const user = req.user._id;
    const newSettings = { ...req.body, user };
    const settings = await Settings.create(newSettings);
    res.status(200).json(settings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/", async (req, res) => {
  try {
    const user = req.user._id;
    const newSettings = { ...req.body, user };
    const settings = await Settings.findOneAndReplace({ user }, newSettings, {
      returnDocument: "after",
    });
    res.status(200).json(settings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
