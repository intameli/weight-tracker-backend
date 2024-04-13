const express = require("express");
const router = express.Router();
const Weight = require("../models/weightModel.js");
const mongoose = require("mongoose");
const requireAuth = require("../requireAuth.js");

router.use(requireAuth);

router.get("/", async (req, res) => {
  try {
    const user = req.user._id;
    const weights = await Weight.find({ user }).sort({
      createdAt: -1,
    });
    res.status(200).json(weights);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const user = req.user._id;
    const { value, units } = req.body;
    const weight = await Weight.create({ value, units, user });
    res.status(200).json(weight);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = req.user._id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Entry does not exist" });
    }
    const weight = await Weight.findOneAndDelete({ _id: id, user });
    if (!weight) {
      return res.status(400).json({ error: "Entry does not exist" });
    }
    res.status(200).json(weight);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
