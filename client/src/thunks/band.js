import {
  getBands as getBandsApi,
  changeLikes as changeLikesApi,
  getSuggestedPeople as getSuggestedPeopleApi,
} from '../api/band';
import {
  getBands as getBandsAction,
  getSuggestedPeople as getSuggestedPeopleAction,
} from '../reducers/band';

export function getBands() {
  return dispatch => getBandsApi()
    .then(({ data }) => {
      dispatch(getBandsAction(data));
    })
    .catch(e => console.log(e));
}

export function changeLikes(id, id1, id2) {
  return dispatch => changeLikesApi(id, id1, id2)
    .then(() => {
      dispatch(getBands());
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
