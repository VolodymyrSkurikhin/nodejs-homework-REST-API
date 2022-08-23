const express = require("express");
const {
  add,
  getAll,
  getById,
  removeById,
  updateById,
  updateFavorite,
} = require("../../controllers/contacts");

const {
  Contact,
  contactSchema,
  updateFavoriteSchema,
} = require("../../models/contact");

const { RequestError, cntrWrapper } = require("../../helpers");

const { isValidId, validator } = require("../../middlewares");

const router = express.Router();

router.get("/", cntrWrapper(getAll));

router.get("/:contactId", isValidId, cntrWrapper(getById));

router.post("/", validator(contactSchema), cntrWrapper(add));

router.delete("/:contactId", isValidId, cntrWrapper(removeById));

router.put(
  "/:contactId",
  isValidId,
  validator(contactSchema),
  cntrWrapper(updateById)
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validator(updateFavoriteSchema),
  cntrWrapper(updateFavorite)
);

module.exports = router;
