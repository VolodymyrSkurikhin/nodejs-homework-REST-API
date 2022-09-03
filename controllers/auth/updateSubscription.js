const { User } = require("../../models/users");
const { RequestError } = require("../../helpers");

const updateSubscription = async (req, res) => {
  const { userId } = req.params;
  if (
    req.body.subscription !== "starter" &&
    req.body.subscription !== "pro" &&
    req.body.subscription !== "business"
  ) {
    throw RequestError(400, "Not valid subscription");
  }
  const updatedUser = await User.findByIdAndUpdate(userId, req.body, {
    new: true,
  });
  if (!updatedUser) {
    throw RequestError(404, "Not found");
  }
  res.json(updatedUser);
};

module.exports = updateSubscription;
