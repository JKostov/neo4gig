
import axios from 'axios';

export function getAnticipatedEvents() {
  return axios.get('http://localhost:4000/anticipatedEvents');
}
