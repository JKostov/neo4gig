import { getAnticipatedEvents as getAnticipatedEventsApi } from '../api/anticipatedEvents';
import { getAnticipatedEvents as getAnticipatedEventsAction } from '../reducers/anticipatedEvents';
import { changeAttendance as changeAttendanceApi } from '../api/feed';

export function getAnticipatedEvents() {
  return dispatch => getAnticipatedEventsApi()
    .then(({ data }) => {
      dispatch(getAnticipatedEventsAction(data));
    })
    .catch(e => console.log(e));
}

export function changeAttendance(id, id1, id2) {
  return dispatch => changeAttendanceApi(id, id1, id2)
    .then(() => {
      dispatch(getAnticipatedEvents());
    })
    .catch(e => console.log(e));
}
