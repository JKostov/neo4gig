
import axios from '.';

export function getFeed(id) {
  return axios.get(`/users/${id}/feed`);
}

export function changeAttendance(id, id1, id2) {
  return axios.put(`/users/${id}/attendance-change`, { id1, id2 });
}

export function changeInterest(id, id1, id2) {
  return axios.put(`/users/${id}/interest-change`, { id1, id2 });
}

export function changeFollow(id, id1, id2) {
  return axios.put(`/users/${id}/follow-change`, { id1, id2 });
}
