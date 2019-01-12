
import axios from '.';

export function login(email, password) {
  return axios.post('/auth/login', {
    email,
    password,
  });
}

export function register(user) {
  return axios.post('/auth/register', {
    user,
  });
}

export function resetPassword(password, token) {
  return axios.post('/auth/reset-password', {
    password,
    token,
  });
}

export function verifyToken(token) {
  return axios.post('/auth/verify-token', {
    token,
  });
}
