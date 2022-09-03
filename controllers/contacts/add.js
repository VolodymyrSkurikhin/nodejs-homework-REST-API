const { Contact } = require("../../models/contact");

const add = async (req, res) => {
  const { _id: owner } = req.user;
  const newEntry = await Contact.create({ ...req.body, owner });
  res.status(201).json(newEntry);
};

module.exports = add;
