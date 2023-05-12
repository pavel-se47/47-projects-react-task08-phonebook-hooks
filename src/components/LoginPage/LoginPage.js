import React, { useState, useCallback } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import authOperations from 'redux/auth-operations';
import phonebookSelectors from 'redux/phonebook-selectors';
import styles from './LoginPage.module.css';
import { ThreeDots } from 'react-loader-spinner';

export default function LoginPage() {
  const dispatch = useDispatch();
  const isLoadingContacts = useSelector(phonebookSelectors.getLoadingContacts);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleChange = useCallback(e => {
    const { name, value } = e.target;

    switch (name) {
      case 'email':
        setEmail(value);
        break;

      case 'password':
        setPassword(value);
        break;

      default:
        throw new Error(`This field type is not processed!: ${name}`);
    }
  }, []);

  const handleSubmit = useCallback(
    e => {
      e.preventDefault();
      dispatch(authOperations.loginUser({ email, password }));
      setEmail('');
      setPassword('');
    },
    [dispatch, email, password]
  );

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
      <div className={styles.login}>
        <form
          onSubmit={handleSubmit}
          className={styles.form}
          autoComplete="off"
        >
          <label className={styles.label}>
            <input
              type="email"
              name="email"
              value={email}
              placeholder="Email"
              onChange={handleChange}
            />
          </label>

          <label className={styles.label}>
            <input
              type="password"
              name="password"
              value={password}
              placeholder="Password"
              onChange={handleChange}
            />
          </label>
          <div className={styles.buttons}>
            <NavLink to="/">
              <button className={styles.button} type="button">
                Home
              </button>
            </NavLink>

            <button className={styles.button} type="submit">
              LogIn
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
