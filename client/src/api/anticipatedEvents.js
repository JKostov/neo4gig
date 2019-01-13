
import axios from '.';

export function getAnticipatedEvents() {
  return axios.get('/events');
}
