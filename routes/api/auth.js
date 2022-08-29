const express = require("express");
const { User, registerSchema, loginSchema } = require("../../models/users");
const { cntrWrapper } = require("../../helpers");
const { validator } = require("../../middlewares");

const router = express.Router();

router.post("/register", validator(registerSchema), cntrWrapper());
