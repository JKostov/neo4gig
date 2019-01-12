import { getAnticipatedEvents as getAnticipatedEventsApi } from '../api/anticipatedEvents';
import { getAnticipatedEvents as getAnticipatedEventsAction } from '../reducers/anticipatedEvents';

export function getAnticipatedEvents() {
  return dispatch => getAnticipatedEventsApi()
    .then(({ data }) => {
      dispatch(getAnticipatedEventsAction(data));
    })
    .catch(e => console.log(e));
}
