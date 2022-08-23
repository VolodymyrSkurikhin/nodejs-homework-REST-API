const express = require("express");
const {
  add,
  getAll,
  getById,
  removeById,
  updateById,
} = require("../../controllers/contacts");

// const Joi = require("joi");

const {
  Contact,
  contactSchema,
  updateFavoriteSchema,
} = require("../../models/contact");

const { RequestError, cntrWrapper } = require("../../helpers");
// const contacts = require("../../models/contacts");
const { isValidId, validator } = require("../../middlewares");

const router = express.Router();
// const contactSchema = Joi.object({
//   name: Joi.string().required(),
//   email: Joi.string().required(),
//   phone: Joi.string().required(),
// });

// router.get("/", async (_, res, next) => {
//   try {
//     const result = await contacts.listContacts();
//     res.json(result);
//   } catch (error) {
//     next(error);
//   }
// });

// router.get("/", async (_, res, next) => {
//   try {
//     const result = await Contact.find();
//     res.json(result);
//   } catch (error) {
//     next(error);
//   }
// });

router.get("/", cntrWrapper(getAll));

router.get("/:contactId", isValidId, cntrWrapper(getById));

router.post("/", validator(contactSchema), cntrWrapper(add));

router.delete("/:contactId", isValidId, cntrWrapper(removeById));

router.put("/contactId", isValidId, cntrWrapper(updateById));

// router.put("/:contactId", isValidId, async (req, res, next) => {
//   try {
//     const { error } = contactSchema.validate(req.body);
//     if (error) {
//       throw RequestError(400, "missing fields");
//     }
//     const { contactId } = req.params;
//     const updatedContact = await Contact.findByIdAndUpdate(
//       contactId,
//       req.body,
//       { new: true }
//     );
//     if (!updatedContact) {
//       throw RequestError(404, "Not found");
//     }
//     res.json(updatedContact);
//   } catch (error) {
//     next(error);
//   }
// });

router.patch("/:contactId/favorite", isValidId, async (req, res, next) => {
  try {
    const { error } = updateFavoriteSchema.validate(req.body);
    if (error) {
      throw RequestError(400, "missing fields");
    }
    const { contactId } = req.params;
    const updatedContact = await Contact.findByIdAndUpdate(
      contactId,
      req.body,
      { new: true }
    );
    if (!updatedContact) {
      throw RequestError(404, "Not found");
    }
    res.json(updatedContact);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
