const { RequestError, sendEmail } = require("../../helpers");
const { User } = require("../../models/users");

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw RequestError(404, "Not found");
  }
  if (user.verify) {
    throw RequestError(400, "Verification has already been passed");
  }
  const verificationToken = user.verificationToken;
  const msg = {
    to: email,
    subject: "Registration confirmation",
    html: `<a href="http://localhost:3000/users/verify/${verificationToken}" target="_blank">
        Press to confirm
      </a>`,
  };
  await sendEmail(msg);
  res.json({ message: "Verification email sent" });
};

module.exports = resendVerifyEmail;
