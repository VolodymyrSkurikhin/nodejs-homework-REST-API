const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleSchemaValidationErrors } = require("../helpers");

const contactDBSchema = new Schema({
  name: {
    type: String,
    required: [true, "Set name for contact"],
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
    unique: true,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
});
// const handleSchemaValidationErrors = (error, data, next) => {
//   const { name, code } = error;
//   if (name === "MongoServerError" && code === 11000) {
//     error.status = 409;
//   } else {
//     error.status = 400;
//   }
//   next();
// };
contactDBSchema.post("save", handleSchemaValidationErrors);

const contactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
});

const Contact = model("contact", contactDBSchema);

module.exports = { Contact, contactSchema };
