
import axios from '.';

export function getBands() {
  return axios.get('/bands');
}

export function changeLikes(id, id1, id2) {
  return axios.put(`/users/${id}/likes-change`, { id1, id2 });
}
