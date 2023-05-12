import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './HomePage.module.css';

const HomePage = () => (
  <div className={styles.phonebookHome}>
    <div className={styles.phonebookTitle}>
      <NavLink to="/contacts">Welcome to yours contacts book!</NavLink>
    </div>
    <div className={styles.phonebookButton}>
      <NavLink to="/register" className={styles.phonebookLink}>
        Register
      </NavLink>
      <NavLink to="/login" className={styles.phonebookLink}>
        LogIn
      </NavLink>
    </div>
  </div>
);

export default HomePage;
