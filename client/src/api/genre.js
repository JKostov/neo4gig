
import axios from 'axios';

export function getGenres() {
  return axios.get('http://localhost:4000/genres');
}
