const { Contact } = require("../../models/contact");

const add = async (req, res) => {
  const newEntry = await Contact.create(req.body);
  res.status(201).json(newEntry);
};

module.exports = add;
