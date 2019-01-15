import {
  getGenres as getGenresApi,
  getSuggestedPeople as getSuggestedPeopleApi,
} from '../api/genre';
import {
  getGenres as getGenresAction,
  getSuggestedPeople as getSuggestedPeopleAction,
} from '../reducers/genre';
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

export function getSuggestedPeople(neoId, id) {
  return dispatch => getSuggestedPeopleApi(neoId, id)
    .then(({ data }) => {
      dispatch(getSuggestedPeopleAction(data));
    })
    .catch(e => console.log(e));
}
