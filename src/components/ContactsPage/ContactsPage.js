import React, { Component } from 'react';
import AppBar from './AppBar/AppBar';
import PhonebookContacts from './PhonebookContacts/PhonebookContacts';
import PhonebookForm from './PhonebookForm/PhonebookForm';
import styles from './ContactsPage.module.css';

class ContactsPage extends Component {
  render() {
    return (
      <>
        <div className={styles.pb}>
          <AppBar />
          <PhonebookForm />
          <PhonebookContacts />
        </div>
      </>
    );
  }
}

export default ContactsPage;
