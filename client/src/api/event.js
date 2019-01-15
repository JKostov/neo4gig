
import axios from '.';

export function createEvent(neoId, event) {
  return axios.post(`/users/${neoId}`, event);
}
