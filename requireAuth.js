const jwt = require("jsonwebtoken");
const User = require("./models/userModel.js");

const requireAuth = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ error: "JWT required" });
  }
  const token = authorization.split(" ")[1];

  try {
    const test = jwt.verify(token, process.env.SECRET);
    const { _id } = jwt.verify(token, process.env.SECRET);
    req.user = await User.findOne({ _id }).select("_id");
    if (req.user === null) {
      throw Error();
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Bad token" });
  }
};

module.exports = requireAuth;
