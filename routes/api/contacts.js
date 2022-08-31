const express = require("express");
const {
  add,
  getAll,
  getById,
  removeById,
  updateById,
  updateFavorite,
} = require("../../controllers/contacts");

const { contactSchema, updateFavoriteSchema } = require("../../models/contact");

const { cntrWrapper } = require("../../helpers");

const { isValidId, validator, authenticate } = require("../../middlewares");

const router = express.Router();

router.get("/", authenticate, cntrWrapper(getAll));

router.get("/:contactId", authenticate, isValidId, cntrWrapper(getById));

router.post("/", authenticate, validator(contactSchema), cntrWrapper(add));

router.delete("/:contactId", authenticate, isValidId, cntrWrapper(removeById));

router.put(
  "/:contactId",
  authenticate,
  isValidId,
  validator(contactSchema),
  cntrWrapper(updateById)
);

router.patch(
  "/:contactId/favorite",
  authenticate,
  isValidId,
  validator(updateFavoriteSchema),
  cntrWrapper(updateFavorite)
);

module.exports = router;
