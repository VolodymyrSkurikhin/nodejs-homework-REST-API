const { isValidObjectId } = require("mongoose");
const { RequestError } = require("../helpers");

const isValidId = (req, _, next) => {
  const { contactId } = req.params;
  if (!isValidObjectId(contactId)) {
    const error = RequestError(400, `${contactId} is not valid`);
    next(error);
  }
  next();
};

module.exports = isValidId;
