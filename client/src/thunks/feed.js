import {
  getFeed as getFeedApi,
  changeAttendance as changeAttendanceApi,
  changeFollow as changeFollowApi,
  changeInterest as changeInterestApi,
} from '../api/feed';
import { createEvent as createEventApi } from '../api/event';
import {
  getFeed as getFeedAction,
} from '../reducers/feed';

export function getFeed(id) {
  return dispatch => getFeedApi(id)
    .then(({ data }) => {
      dispatch(getFeedAction(data));
    })
    .catch(e => console.log(e));
}

export function changeAttendance(id, id1, id2) {
  return dispatch => changeAttendanceApi(id, id1, id2)
    .then(() => {
      dispatch(getFeed(id));
    })
    .catch(e => console.log(e));
}

export function changeFollow(id, id1, id2) {
  return dispatch => changeFollowApi(id, id1, id2)
    .then(() => {
      dispatch(getFeed(id));
    })
    .catch(e => console.log(e));
}

export function changeInterest(id, id1, id2) {
  return dispatch => changeInterestApi(id, id1, id2)
    .then(() => {
      dispatch(getFeed(id));
    })
    .catch(e => console.log(e));
}

export function createEvent(id, neoId, event) {
  return dispatch => createEventApi(neoId, event)
    .then(() => {
      dispatch(getFeed(id));
    })
    .catch(e => console.log(e));
}
