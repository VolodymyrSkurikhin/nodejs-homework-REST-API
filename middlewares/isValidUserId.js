const { isValidObjectId } = require("mongoose");
const { RequestError } = require("../helpers");

const isValidUserId = (req, _, next) => {
  const { userId } = req.params;
  if (!isValidObjectId(userId)) {
    const error = RequestError(400, `${userId} is not valid`);
    next(error);
  }
  next();
};

module.exports = isValidUserId;
