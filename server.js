const express = require("express");
require("dotenv").config();
const weightRoutes = require("./routes/weightRoutes.js");
const userRoutes = require("./routes/userRoutes.js");
const settingsRoutes = require("./routes/settingsRoutes.js");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(
  cors({
    origin: "https://wt.jacobasmith.com",
  })
);
app.use(express.json());
app.use("/api/weights", weightRoutes);
app.use("/api/user", userRoutes);
app.use("/api/settings", settingsRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("Listening on port " + process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
