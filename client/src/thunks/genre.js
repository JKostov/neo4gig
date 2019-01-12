import { getGenres as getGenresApi } from '../api/genre';
import { getGenres as getGenresAction } from '../reducers/genre';

export function getGenres() {
  return dispatch => getGenresApi()
    .then(({ data }) => {
      dispatch(getGenresAction(data));
    })
    .catch(e => console.log(e));
}
