const express = require("express");
const { add, getAll, getById } = require("../../controllers/contacts");

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

// router.get("/:contactId", isValidId, async (req, res, next) => {
//   try {
//     const { contactId } = req.params;
//     const oneContact = await Contact.findById(contactId);
//     if (!oneContact) {
//       throw RequestError(404, "Not found");
//     }
//     res.json(oneContact);
//   } catch (error) {
//     next(error);
//   }
// });

// router.post("/", async (req, res, next) => {
//   try {
//     const { error } = contactSchema.validate(req.body);
//     if (error) {
//       throw RequestError(400, error.message);
//     }
//     const allContacts = await contacts.listContacts();
//     const { name, email, phone } = req.body;
//     const isInList = allContacts.some(
//       (item) =>
//         item.name === name || item.email === email || item.phone === phone
//     );
//     if (isInList) {
//       throw RequestError(400, "Already in list!");
//     }
//     const newEntry = await contacts.addContact(req.body);
//     res.status(201).json(newEntry);
//   } catch (error) {
//     next(error);
//   }
// });

// router.post("/", async (req, res, next) => {
//   try {
//     const { error } = contactSchema.validate(req.body);
//     if (error) {
//       throw RequestError(400, error.message);
//     }
//     const newEntry = await Contact.create(req.body);
//     res.status(201).json(newEntry);
//   } catch (error) {
//     next(error);
//   }
// });

router.post("/", validator(contactSchema), cntrWrapper(add));

// router.delete("/:contactId", async (req, res, next) => {
//   try {
//     const { contactId } = req.params;
//     const result = await contacts.removeContact(contactId);
//     if (!result) {
//       throw RequestError(404, "Not found");
//     }
//     res.json({ message: "contact deleted" });
//   } catch (error) {
//     next(error);
//   }
// });

router.delete("/:contactId", isValidId, async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndRemove(contactId);
    if (!result) {
      throw RequestError(404, "Not found");
    }
    res.json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
});

// router.put("/:contactId", async (req, res, next) => {
//   try {
//     const { error } = contactSchema.validate(req.body);
//     if (error) {
//       throw RequestError(400, "missing fields");
//     }
//     const { contactId } = req.params;
//     const updatedContact = await contacts.updateContact(contactId, req.body);
//     if (!updatedContact) {
//       throw RequestError(404, "Not found");
//     }
//     res.json(updatedContact);
//   } catch (error) {
//     next(error);
//   }
// });

router.put("/:contactId", isValidId, async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
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
