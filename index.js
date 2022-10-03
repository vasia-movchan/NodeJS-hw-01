const fs = require('fs').promises;
const argv = require('yargs').argv;
const { listContacts, getContactById } = require('./contacts');

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      const allContacts = await listContacts();
      console.table(allContacts);
      break;

    case 'get':
      const contactById = await getContactById(id);
      console.table(contactById);
      break;

    // case 'add':
    //   // ... name email phone
    //   break;

    // case 'remove':
    //   // ... id
    //   break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(argv);
