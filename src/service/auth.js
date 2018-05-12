import axios from 'axios';
import Token from '../utils/token';

axios.defaults.baseURL = '/api/v1/auth';

export const signIn = (email, password) => (
  axios.post('sign-in', {
    email,
    password
  })
  .then(({ data }) => {
    if (data.token) {
      Token.setToken(data.token);
      return data.user;
    }
    throw new Error('Sign in failed!');
  })
);

export const signUp = (username, email, password, profile) => (
  axios.post('sign-up', {
    username,
    email,
    password,
    profile
  })
  .then(({ data }) => {
    if (data.token) {
      Token.setToken(data.token);
      return data.user;
    }
    throw new Error('Sign up failed!');
  })
);

export const signOut = () => (
  axios.post('sign-out',
  { },
  Token.withToken())
  .then(() => {
    return Token.removeToken();
  })
);

export const changePassword = (password, newPassword) => (
  axios.post('change-password', {
    password,
    newPassword
  },
  Token.withToken())
);