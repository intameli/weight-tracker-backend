const mongoose = require("mongoose");

const weightSchema = new mongoose.Schema(
  {
    value: {
      type: Number,
      required: true,
    },
    units: {
      type: String,
      required: true,
    },
    user: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Weight", weightSchema);
