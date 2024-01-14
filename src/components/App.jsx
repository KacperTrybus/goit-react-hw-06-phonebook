import React, { useState, useEffect } from 'react';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import ContactForm from './ContactForm/ContactForm';
import './app.css';

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const storedContacts = localStorage.getItem('contacts');
    if (storedContacts) {
      setContacts(JSON.parse(storedContacts));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const contactExists = newContact =>
    contacts.some(
      contact => contact.name.toLowerCase() === newContact.name.toLowerCase()
    );

  const addContact = newContact => {
    if (contactExists(newContact)) {
      alert('Contact already exists');
    } else {
      setContacts(prevContacts => [...prevContacts, newContact]);
    }
  };

  const handleContactDelete = deletedContact => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== deletedContact.id)
    );
  };

  const handleFilterChange = filterValue => {
    setFilter(filterValue);
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="wrapper">
      <h1>Phonebook</h1>
      <ContactForm addContact={addContact} />
      <h2>Contacts</h2>
      <Filter filter={filter} setFilter={handleFilterChange} />
      <ContactList
        contacts={filteredContacts}
        handleContactDelete={handleContactDelete}
      />
    </div>
  );
};

export default App;
