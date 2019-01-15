
import axios from '.';

export function getBands() {
  return axios.get('/bands');
}

export function changeLikes(id, id1, id2) {
  return axios.put(`/users/${id}/likes-change`, { id1, id2 });
}

export function getSuggestedPeople(neoId, id) {
  return axios.get(`/users/${neoId}/bands/${id}/suggested`);
}
