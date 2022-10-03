const fs = require('fs').promises;
const path = require('path');

const contactsPath = path.join(__dirname, './db/contacts.json');

async function listContacts() {
  const contacts = await fs.readFile(contactsPath);
  return JSON.parse(contacts);
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const contactById = contacts.find(
    (contact) => contact.id === contactId.toString()
  );
  return contactById || null;
}

// function removeContact(contactId) {
//   // ...твій код
// }

// function addContact(name, email, phone) {
//   // ...твій код
// }

module.exports = {
  listContacts,
  getContactById,
};
