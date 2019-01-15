
import axios from '.';

export function getBands() {
  return axios.get('/bands');
}
