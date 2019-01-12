
import axios from '.';

export function getGenres() {
  return axios.get('/genres');
}
