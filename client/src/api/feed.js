
import axios from '.';

export function getFeed(id) {
  return axios.get(`/users/${id}/feed`);
}
