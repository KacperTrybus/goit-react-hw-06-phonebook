import React, { useEffect } from 'react';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import ContactForm from './ContactForm/ContactForm';
import './app.css';
import { useDispatch, useSelector } from 'react-redux';
import { addContact, deleteContact } from '../redux/contactsSlice';
import { setFilter } from '../redux/filterSlice';

const App = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts.contacts || []);
  const filter = useSelector(state => state.filter || '');

  useEffect(() => {
    const storedContacts = localStorage.getItem('contacts');
    console.log('Stored Contacts:', storedContacts);

    if (storedContacts) {
      const parsedContacts = JSON.parse(storedContacts);
      dispatch(addContact(parsedContacts));
    }
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const contactExists = newContact =>
    contacts.some(
      contact => contact.name.toLowerCase() === newContact.name.toLowerCase()
    );

  const handleAddContact = newContact => {
    if (contactExists(newContact)) {
      alert('Contact already exists');
    } else {
      dispatch(addContact(newContact));
      console.log('Updated Contacts:', contacts);
    }
  };

  const handleDeleteContact = deletedContact => {
    dispatch(deleteContact(deletedContact.id));
  };

  const handleFilterChange = filterValue => {
    dispatch(setFilter(filterValue));
  };

  const filteredContacts = contacts.filter(
    contact =>
      contact.name && contact.name.toLowerCase().includes(filter.toLowerCase())
  );
  return (
    <div className="wrapper">
      <h1>Phonebook</h1>
      <ContactForm addContact={handleAddContact} />
      <h2>Contacts</h2>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <ContactList
        contacts={filteredContacts}
        handleDeleteContact={handleDeleteContact}
      />
    </div>
  );
};
// test
export default App;
