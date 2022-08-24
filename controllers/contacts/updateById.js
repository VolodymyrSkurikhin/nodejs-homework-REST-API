const { Contact } = require("../../models/contact");
const { RequestError } = require("../../helpers");

const updateById = async (req, res) => {
  const { contactId } = req.params;
  const updatedContact = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!updatedContact) {
    throw RequestError(404, "Not found");
  }
  res.json(updatedContact);
};

module.exports = updateById;
