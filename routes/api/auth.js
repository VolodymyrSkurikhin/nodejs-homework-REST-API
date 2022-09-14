const express = require("express");
const {
  register,
  login,
  logout,
  getCurrentUser,
  updateSubscription,
  updateAvatar,
  verifyEmail,
  resendVerifyEmail,
} = require("../../controllers/auth");
const {
  registerSchema,
  loginSchema,
  updateSubscriptionSchema,
  verifyEmailSchema,
} = require("../../models/users");
const { cntrWrapper } = require("../../helpers");
const {
  validator,
  authenticate,
  isValidUserId,
  upload,
  resizeAvatar,
} = require("../../middlewares");

const router = express.Router();

router.post("/signup", validator(registerSchema), cntrWrapper(register));
router.get("/verify/:verificationToken", cntrWrapper(verifyEmail));
router.post(
  "/verify",
  validator(verifyEmailSchema),
  cntrWrapper(resendVerifyEmail)
);
router.post("/login", validator(loginSchema), cntrWrapper(login));
router.get("/logout", authenticate, cntrWrapper(logout));
router.get("/current", authenticate, cntrWrapper(getCurrentUser));
router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  resizeAvatar,
  cntrWrapper(updateAvatar)
);

router.patch(
  "/:userId/subscription",
  authenticate,
  isValidUserId,
  validator(updateSubscriptionSchema),
  cntrWrapper(updateSubscription)
);

module.exports = router;
