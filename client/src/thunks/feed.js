import { getFeed as getFeedApi } from '../api/feed';
import { getFeed as getFeedAction } from '../reducers/feed';

export function getFeed(id) {
  return dispatch => getFeedApi(id)
    .then(({ data }) => {
      dispatch(getFeedAction(data));
    })
    .catch(e => console.log(e));
}
