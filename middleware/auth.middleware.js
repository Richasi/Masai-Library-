const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (decoded) {
        req.user = decoded;
        next();
      } else {
        res.status(401).json({ message: "Unauthorized" });
      }
    });
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = auth;
