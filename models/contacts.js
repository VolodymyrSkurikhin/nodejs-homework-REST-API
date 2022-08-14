const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const pathToContacts = path.join(__dirname, "contacts.json");

const refreshContacts = async (entry) => {
  await fs.writeFile(pathToContacts, JSON.stringify(entry, null, 2));
};

const listContacts = async () => {
  const data = await fs.readFile(pathToContacts);
  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  const allContacts = await listContacts();
  const oneContact = allContacts.find((item) => item.id === contactId);
  return oneContact || null;
};

const removeContact = async (contactId) => {
  const allContacts = await listContacts();
  const idx = allContacts.findIndex((item) => item.id === contactId);
  if (idx === -1) {
    return null;
  }
  const [removedContact] = allContacts.splice(idx, 1);
  await refreshContacts(allContacts);
  return removedContact;
};

const addContact = async ({ name, email, phone }) => {
  const allContacts = await listContacts();
  const newEntry = {
    id: nanoid(),
    name,
    email,
    phone,
    // ...body,
  };
  allContacts.push(newEntry);
  await refreshContacts(allContacts);
  // const newContacts = await listContacts();
  return { newEntry, allContacts };
};

const updateContact = async (contactId, body) => {};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
