const { expressjwt: jwt } = require("express-jwt");

// assuring that without user token we can't modify data :
const requireSignIn = jwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
});

module.exports = requireSignIn;
