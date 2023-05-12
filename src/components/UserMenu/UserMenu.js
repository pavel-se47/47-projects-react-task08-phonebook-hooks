import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import defaultAvatar from './default-avatar.png';
import authSelector from 'redux/auth-selector';
import authOperations from 'redux/auth-operations';
import styles from './UserMenu.module.css';

export default function UserMenu() {
  const dispatch = useDispatch();
  const name = useSelector(authSelector.getUserName);

  const onLogout = useCallback(
    () => dispatch(authOperations.logoutUser()),
    [dispatch]
  );

  return (
    <div className={styles.phonebookContainer}>
      <img
        src={defaultAvatar}
        alt="avatar"
        width="32"
        className={styles.userAvatar}
      />
      <span className={styles.userName}>Welcome, {name}</span>
      <button className={styles.button} type="button" onClick={onLogout}>
        LogOut
      </button>
    </div>
  );
}
