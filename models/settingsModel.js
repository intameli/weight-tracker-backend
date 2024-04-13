const mongoose = require("mongoose");

const settingsSchema = new mongoose.Schema({
  forceDecimals: {
    type: Boolean,
    required: true,
  },
  showTime: {
    type: Boolean,
    required: true,
  },
  units: {
    type: String,
    required: true,
  },
  decimals: {
    type: Number,
    required: true,
  },
  user: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Settings", settingsSchema);
