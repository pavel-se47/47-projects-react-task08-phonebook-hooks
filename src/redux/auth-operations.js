import axios from 'axios';
import authActions from './auth-actions';
import { error, success, defaultModules, Stack } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import * as PNotifyMobile from '@pnotify/mobile';
import '@pnotify/mobile/dist/PNotifyMobile.css';
import '@pnotify/core/dist/BrightTheme.css';

defaultModules.set(PNotifyMobile, {});

const myStack = new Stack({
  dir1: 'down',
  // dir2: 'right',
  firstpos1: 50,
  firstpos2: 50,
  spacing1: 36,
  spacing2: 36,
  push: 'bottom',
  context: document.body,
});

axios.defaults.baseURL = 'https://connections-api.herokuapp.com';

const loginSuccessNotification = () => {
  success({
    title: 'Login Successful!',
    delay: 3000,
    hide: true,
    width: '400px',
    stack: myStack,
  });
};

const loginErrorNotification = (message, text) => {
  error({
    title: `${message}`,
    text: 'Wrong email or password!',
    delay: 5000,
    hide: true,
    width: '400px',
    stack: myStack,
  });
};

const logoutSuccessNotification = () => {
  success({
    title: 'Logout Successful!',
    delay: 3000,
    hide: true,
    width: '400px',
    stack: myStack,
  });
};

const logoutErrorNotification = (message, text) => {
  error({
    title: `${message}`,
    text: `${text}`,
    delay: 5000,
    hide: true,
    width: '400px',
    stack: myStack,
  });
};

const registerSuccessNotification = () => {
  success({
    title: 'Register Successful!',
    delay: 3000,
    hide: true,
    width: '400px',
    stack: myStack,
  });
};

const registerErrorNotification = (message, text) => {
  if (text === 1) {
    error({
      title: `${message}`,
      text: 'Try using a different email!',
      delay: 5000,
      hide: true,
      width: '400px',
      stack: myStack,
    });
  } else
    error({
      title: `${message}`,
      text: `${text}`,
      delay: 5000,
      hide: true,
      width: '400px',
      stack: myStack,
    });
};

const token = {
  set(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = '';
  },
};

const registerUser = userData => async dispatch => {
  dispatch(authActions.registerRequest());

  try {
    const response = await axios.post('/users/signup', userData);
    token.set(response.data.token);
    dispatch(authActions.registerSuccess(response.data));
    registerSuccessNotification();
  } catch (error) {
    dispatch(authActions.registerError(error.message));
    console.log(error);
    registerErrorNotification(
      error.message,
      error.response.data.message || error.response.data.keyPattern.email
    );
  }
};

const loginUser = userData => async dispatch => {
  dispatch(authActions.loginRequest());

  try {
    const response = await axios.post('/users/login', userData);
    token.set(response.data.token);
    dispatch(authActions.loginSuccess(response.data));
    console.log(response);
    loginSuccessNotification();
  } catch (error) {
    dispatch(authActions.loginError(error.message));
    loginErrorNotification(error.message, error.request.statusText);
  }
};

const logoutUser = () => async dispatch => {
  dispatch(authActions.logoutRequest());

  try {
    await axios.post('/users/logout');
    token.unset();
    dispatch(authActions.logoutSuccess());
    logoutSuccessNotification();
  } catch (error) {
    dispatch(authActions.logoutError(error.message));
    logoutErrorNotification(error.message, error.request.statusText);
  }
};

const getCurrentUser = () => async (dispatch, getState) => {
  const {
    auth: { token: persistedToken },
  } = getState();

  if (!persistedToken) {
    return;
  }

  token.set(persistedToken);
  dispatch(authActions.getCurrentUserRequest());

  try {
    const response = await axios.get('/users/current');
    dispatch(authActions.getCurrentUserSuccess(response.data));
  } catch (error) {
    dispatch(authActions.getCurrentUserError(error.message));
  }
};

// eslint-disable-next-line
export default { registerUser, loginUser, logoutUser, getCurrentUser };
