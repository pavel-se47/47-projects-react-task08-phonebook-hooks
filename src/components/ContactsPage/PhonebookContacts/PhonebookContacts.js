import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import operations from 'redux/phonebook-operations';
import actions from 'redux/phonebook-actions';
import styles from './PhonebookContacts.module.css';
import phonebookSelectors from 'redux/phonebook-selectors';

export default function PhonebookContacts() {
  const dispatch = useDispatch();

  const contacts = useSelector(phonebookSelectors.getFilteredContacts);
  const filter = useSelector(phonebookSelectors.getFilter);

  const addDeleteContact = id => dispatch(operations.deleteContact(id));

  const addFilterResult = e => dispatch(actions.filterContact(e.target.value));

  return (
    <div className={styles.phonebookContacts}>
      <p className={styles.title}>My contacts</p>

      <div className={styles.border}>
        <label className={styles.label}>
          <input
            type="text"
            className={styles.input}
            name="filter"
            value={filter}
            placeholder="Enter name for search"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            onChange={addFilterResult}
          />
        </label>
        <ul>
          {contacts.map(contact => (
            <li key={contact.id} className={styles.contactName}>
              {contact.name}: {contact.number}
              <button
                type="button"
                className={styles.button}
                onClick={() => addDeleteContact(contact.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
        <p className={styles.subtitle}>Total contacts: {contacts.length}</p>
      </div>
    </div>
  );
}
