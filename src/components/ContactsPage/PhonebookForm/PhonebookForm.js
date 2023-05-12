import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import operations from 'redux/phonebook-operations';
import phonebookSelectors from 'redux/phonebook-selectors';
import styles from './PhonebookForm.module.css';
import { ThreeDots } from 'react-loader-spinner';

export default function PhonebookForm() {
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  useEffect(() => {
    dispatch(operations.fetchAllContacts());
  }, [dispatch]);

  const contacts = useSelector(phonebookSelectors.getAllContacts);
  const isLoadingContacts = useSelector(phonebookSelectors.getLoadingContacts);

  const nameChange = e => {
    setName(e.currentTarget.value);
  };

  const numberChange = e => {
    setNumber(e.currentTarget.value);
  };

  const formSubmit = e => {
    e.preventDefault();
    if (
      contacts.find(
        contact =>
          contact.name.toLowerCase() === name.toLowerCase() ||
          contact.number === number
      )
    ) {
      return alert(
        'Error! A contact with the same name/number already exists!'
      );
    }
    dispatch(operations.addContact(name, number));
    formReset();
  };

  const formReset = () => {
    setName('');
    setNumber('');
  };

  return (
    <>
      <div className={styles.loading}>
        {isLoadingContacts && (
          <ThreeDots
            height="80"
            width="80"
            radius="9"
            color="skyblue"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClassName=""
            visible={true}
          />
        )}
      </div>
      <p className={styles.title}>Add new contact</p>
      <form className={styles.phonebookForm} onSubmit={formSubmit}>
        <div className={styles.border}>
          <label className={styles.label}>
            <input
              type="text"
              className={styles.input}
              name="name"
              value={name}
              placeholder="Enter Name"
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              required
              onChange={nameChange}
            />
          </label>
          <label className={styles.label}>
            <input
              type="tel"
              className={styles.input}
              name="number"
              value={number}
              placeholder="Enter Number"
              pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
              required
              onChange={numberChange}
            />
          </label>
          <button type="submit" className={styles.button}>
            Add contact
          </button>
        </div>
      </form>
    </>
  );
}
