
import axios from '.';

export default function (email) {
  return axios.post('/auth/forgot-password', {
    email,
  });
}
