
import { loginUser, logoutUser } from '../reducers/auth';
import { login as loginApi } from '../api/auth';

export function logout() {
  return (dispatch) => {
    dispatch(logoutUser());
    localStorage.removeItem('_token');
  };
}

export function login(email, password) {
  return dispatch => loginApi(email, password)
    .then((response) => {
      const { data } = response.data;
      const { token } = data;
      delete data.token;
      return {
        token,
        user: data,
      };
    })
    .then((payload) => {
      dispatch(loginUser(payload));
      localStorage.setItem('_token', payload.token);
    });
}
