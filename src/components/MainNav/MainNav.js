import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import authSelector from 'redux/auth-selector';
import styles from './MainNav.module.css';

export default function MainNav() {
  const isAuthenticated = useSelector(authSelector.getIsAuthenticated);

  return (
    <nav>
      <NavLink to="/" className={styles.phonebookLink}>
        Home
      </NavLink>
      {isAuthenticated && (
        <NavLink to="/contacts" className={styles.phonebookLink}>
          Contacts
        </NavLink>
      )}
    </nav>
  );
}
