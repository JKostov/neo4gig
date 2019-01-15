import { getGenres as getGenresApi } from '../api/genre';
import { getGenres as getGenresAction } from '../reducers/genre';
import { changeInterest as changeInterestApi } from '../api/feed';

export function getGenres() {
  return dispatch => getGenresApi()
    .then(({ data }) => {
      dispatch(getGenresAction(data));
    })
    .catch(e => console.log(e));
}

export function changeInterest(id, id1, id2) {
  return dispatch => changeInterestApi(id, id1, id2)
    .then(() => {
      dispatch(getGenres());
    })
    .catch(e => console.log(e));
}
