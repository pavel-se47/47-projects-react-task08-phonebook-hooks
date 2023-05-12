import React, { lazy, Suspense, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route, Navigate } from 'react-router-dom';
import authOperations from 'redux/auth-operations';
import PrivateRoute from 'components/PrivateRoute';
import PublicRoute from 'components/PublicRoute';
import { ThreeDots } from 'react-loader-spinner';
import styles from './components/ContactsPage/PhonebookForm/PhonebookForm.module.css';

const HomePage = lazy(() =>
  import('components/HomePage/HomePage' /* webpackChunkName: "home-page" */)
);

const LoginPage = lazy(() =>
  import('components/LoginPage/LoginPage' /* webpackChunkName: "login-page" */)
);

const RegisterPage = lazy(() =>
  import(
    'components/RegisterPage/RegisterPage' /* webpackChunkName: "regiter-page" */
  )
);

const ContactsPage = lazy(() =>
  import(
    'components/ContactsPage/ContactsPage' /* webpackChunkName: "contacts-page" */
  )
);

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authOperations.getCurrentUser);
  }, [dispatch]);

  return (
    <>
      <Suspense
        fallback={
          <div className={styles.loading}>
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
          </div>
        }
      >
        <Routes>
          <Route element={<PublicRoute redirectPath="/contacts" restricted />}>
            <Route index path="/" element={<HomePage />} />
          </Route>

          <Route element={<PublicRoute redirectPath="/contacts" restricted />}>
            <Route path="/register" element={<RegisterPage />} />
          </Route>

          <Route element={<PublicRoute redirectPath="/contacts" restricted />}>
            <Route path="/login" element={<LoginPage />} />
          </Route>

          <Route element={<PrivateRoute redirectPath="/login" />}>
            <Route path="/contacts" element={<ContactsPage />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </>
  );
}
