
import { Map } from 'immutable';
import { createAction, handleActions } from 'redux-actions';
import { GET_FEED_ACTION } from '../consts/actions';

// CREATE ACTIONS
export const getFeed = createAction(GET_FEED_ACTION);

// SET INITIAL STATE
const INITIAL_STATE = Map({
  feed: null,
});

// WRITE HANDLERS FOR ACTIONS
export default handleActions(
  {

    [GET_FEED_ACTION](state, { payload }) {
      return state.set('feed', payload);
    },
  },
  INITIAL_STATE,
);
