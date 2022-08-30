const bcrypt = require("bcryptjs");
const { User } = require("../../models/users");
const { RequestError } = require("../../helpers");

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw RequestError(401, "Email or password is wrong");
  }
  const isCorrectPassword = await bcrypt.compare(password, user.password);
  if (!isCorrectPassword) {
    throw RequestError(401, "Email or password is wrong");
  }
  const token = "111222333";
  res.json({ token });
};

module.exports = login;
