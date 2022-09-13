const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const { nanoid } = require("nanoid");

const { RequestError, sendEmail } = require("../../helpers");
const { User } = require("../../models/users");

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw RequestError(409, "This email is already in use");
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);
  const verificationToken = nanoid();
  const msg = {
    to: email,
    subject: "Registration confirmation",
    html: `<a href="http://localhost:3000/users/verify/${verificationToken}" target="_blank">
        Press to confirm
      </a>`,
  };
  await sendEmail(msg);
  const result = await User.create({
    email,
    password: hashedPassword,
    avatarURL,
    verificationToken,
  });

  res
    .status(201)
    .json({ user: { email: result.email, subscription: result.subscription } });
};

module.exports = register;
