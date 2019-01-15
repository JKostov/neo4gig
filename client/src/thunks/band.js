import { getBands as getBandsApi } from '../api/band';
import { getBands as getBandsAction } from '../reducers/band';

export function getBands() {
  return dispatch => getBandsApi()
    .then(({ data }) => {
      dispatch(getBandsAction(data));
    })
    .catch(e => console.log(e));
}
