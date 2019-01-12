
import { Map } from 'immutable';
import { createAction, handleActions } from 'redux-actions';
import { GET_GENRES_ACTION } from '../consts/actions';

// CREATE ACTIONS
export const getGenres = createAction(GET_GENRES_ACTION);

// SET INITIAL STATE
const INITIAL_STATE = Map({
  genres: [],
});

// WRITE HANDLERS FOR ACTIONS
export default handleActions(
  {

    [GET_GENRES_ACTION](state, { payload }) {
      return state.set('genres', payload);
    },
  },
  INITIAL_STATE,
);
