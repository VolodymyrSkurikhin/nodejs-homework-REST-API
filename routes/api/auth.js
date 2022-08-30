const express = require("express");
const { register, login } = require("../../controllers/auth");
const { registerSchema, loginSchema } = require("../../models/users");
const { cntrWrapper } = require("../../helpers");
const { validator } = require("../../middlewares");

const router = express.Router();

router.post("/signup", validator(registerSchema), cntrWrapper(register));
router.post("/login", validator(loginSchema), cntrWrapper(login));

module.exports = router;
