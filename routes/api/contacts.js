const express = require("express");

const Joi = require("joi");

const { RequestError } = require("../../helpers");
const contacts = require("../../models/contacts");

const router = express.Router();
const contactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

router.get("/", async (_, res, next) => {
  try {
    const result = await contacts.listContacts();
    res.json(result);
  } catch (error) {
    // error.message = "Server error";
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const oneContact = await contacts.getContactById(contactId);
    if (!oneContact) {
      throw RequestError(404, "Not found");
    }
    res.json(oneContact);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      throw RequestError(400, error.message);
    }
    const { newEntry, allContacts } = await contacts.addContact(req.body);
    const { name, email, phone } = req.body;
    const isInList = allContacts.some(
      (item) =>
        item.name === name || item.email === email || item.phone === phone
    );
    if (isInList) {
      throw RequestError(400, "Already in list!");
    }
    res.status(201).json(newEntry);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contacts.removeContact(contactId);
    if (!result) {
      throw RequestError(404, "Not found");
    }
    res.json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

module.exports = router;
