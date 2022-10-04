const fs = require('fs').promises;
const path = require('path');
const { nanoid } = require('nanoid');

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

async function removeContact(contactId) {
  const contacts = await listContacts();
  const id = contacts.find((contact) => contact.id === contactId.toString());

  if (id) {
    const contactsAfterRemove = contacts.filter(
      (contact) => contact.id !== contactId.toString()
    );
    await fs.writeFile(
      contactsPath,
      JSON.stringify(contactsAfterRemove, null, ' ')
    );
    return contactsAfterRemove;
  }

  return null;
}

async function addContact(name, email, phone) {
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };

  const contacts = await listContacts();
  const newContacts = [...contacts, newContact];
  await fs.writeFile(contactsPath, JSON.stringify(newContacts, null, ' '));

  return newContacts;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
