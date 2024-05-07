import { openDB } from 'idb';

const initdb = async () => {
  openDB('contacts', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('contacts')) {
        console.log('contacts database already exists');
        return;
      }
      db.createObjectStore('contacts', { keyPath: 'id', autoIncrement: true });
      console.log('contacts database created');
    },
  });
};

export const postDb = async (name, home, cell, email)  => {
  console.log('Post contact');
  const contactsDb = await openDB('contacts', 1);
  const tx = contactsDb.transaction('contacts', 'readwrite');
  const store = tx.objectStore('contacts');
  const request = store.add({ name: name, home_phone: home, cell_phone: cell, email: email });
  const result = await request;
  console.log('Contact saved!', result);
};

export const getDb = async () => {
  console.log('Get all contacts');
  const contactsDb = await openDB('contacts', 1);
  const tx = contactsDb.transaction('contacts', 'readonly');
  const store = tx.objectStore('contacts');
  const request = store.getAll();
  const result = await request;
  console.log('result.value', result);
  return result
};

export const deleteDb = async (id) => {
  console.log('Delete contact', id);
  const contactsDb = await openDB('contacts', 1);
  const tx = contactsDb.transaction('contacts', 'readwrite');
  const store = tx.objectStore('contacts');
  const request = store.delete(id);
  const result = await request;
  console.log('result.value', result);
  return result?.value
};

initdb();
