const handleSchemaValidationErrors = (error, data, next) => {
  const { name, code } = error;
  if (name === "MongoServerError" && code === 11000) {
    error.status = 409;
    error.message = "qqqqqq";
  } else {
    error.status = 400;
  }
  next(error);
};

module.exports = handleSchemaValidationErrors;
