import React from 'react';
import { useSelector } from 'react-redux';
import Navigation from '../../MainNav/MainNav';
import UserMenu from '../../UserMenu/UserMenu';
import AuthNav from '../../AuthNav/AuthNav';
import authSelector from 'redux/auth-selector';
import styles from './AppBar.module.css';

export default function AppBar() {
  const isAuthenticated = useSelector(authSelector.getIsAuthenticated);

  return (
    <header className={styles.phonebookHeader}>
      <Navigation />
      {isAuthenticated ? <UserMenu /> : <AuthNav />}
    </header>
  );
}
