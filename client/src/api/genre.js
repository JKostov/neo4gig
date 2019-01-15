
import axios from '.';

export function getGenres() {
  return axios.get('/genres');
}

export function getSuggestedPeople(neoId, id) {
  return axios.get(`/users/${neoId}/genres/${id}/suggested`);
}
