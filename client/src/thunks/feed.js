import {
  getFeed as getFeedApi,
  changeAttendance as changeAttendanceApi,
  changeFollow as changeFollowApi,
  changeInterest as changeInterestApi,
} from '../api/feed';
import {
  getFeed as getFeedAction,
  changeAttendance as changeAttendanceAction,
  changeFollow as changeFollowAction,
  changeInterest as changeInterestAction,
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
    .then(({ data }) => {
      dispatch(changeAttendanceAction(data));
    })
    .catch(e => console.log(e));
}

export function changeFollow(id, id1, id2) {
  return dispatch => changeFollowApi(id, id1, id2)
    .then(({ data }) => {
      dispatch(changeFollowAction(data));
    })
    .catch(e => console.log(e));
}

export function changeInterest(id, id1, id2) {
  return dispatch => changeInterestApi(id, id1, id2)
    .then(({ data }) => {
      dispatch(changeInterestAction(data));
    })
    .catch(e => console.log(e));
}
