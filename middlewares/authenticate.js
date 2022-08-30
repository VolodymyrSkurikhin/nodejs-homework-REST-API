const { RequestError } = require("../helpers");

const authenticate = async (req, res, next) => {
  const { authorization } = req.headers;
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") {
    next(RequestError(401, "Not authorized"));
  }
};

module.exports = authenticate;
