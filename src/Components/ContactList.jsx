import React, { useState, useEffect } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'

const ContactList = ({ setUiState, editContact, onDeleteContact, contactList,loading, }) => {
  
  

  
  

  const contactComponents = contactList.map(contact => (
  <div className="horizontal-rule" key={contact._id}>
    <div className="contact-section">
      <li className="list__item">
        <p className="contact-name">{contact.name}</p>
        <button onClick={() => { console.log('contactlist Contact',contact); editContact(contact); }}>EDIT</button>
        <button onClick={() => onDeleteContact(contact)}><FontAwesomeIcon icon={faTrash} /></button>

      </li>
    </div>
  </div>))
  
  
  return (
    <div className="page-container">
      <div className="container">
        <header className="header">
          <h2>Contacts</h2>
          <form action="" className="search-bar">
            <input
              type="search-name"
              className="contact-search"
              name="search-area"
              placeholder="Search"
            />
            <FontAwesomeIcon icon={faPlus} onClick={() => setUiState('newcontact')} />
          </form>
        </header>

        <div className="contacts-library">
          {loading && <p>Loading...</p>}  
          <ul className="contacts-list">
            {contactComponents}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ContactList;