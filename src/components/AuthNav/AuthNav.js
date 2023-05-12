import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './AuthNav.module.css';

const AuthNav = () => (
  <div>
    <NavLink to="/register" className={styles.phonebookLink}>
      Register
    </NavLink>
    <NavLink to="/login" className={styles.phonebookLink}>
      LogIn
    </NavLink>
  </div>
);

export default AuthNav;
