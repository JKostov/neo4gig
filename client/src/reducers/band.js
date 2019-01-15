
import { Map } from 'immutable';
import { createAction, handleActions } from 'redux-actions';
import { GET_BANDS_ACTION } from '../consts/actions';

// CREATE ACTIONS
export const getBands = createAction(GET_BANDS_ACTION);

// SET INITIAL STATE
const INITIAL_STATE = Map({
  bands: [],
});

// WRITE HANDLERS FOR ACTIONS
export default handleActions(
  {

    [GET_BANDS_ACTION](state, { payload }) {
      return state.set('bands', payload);
    },
  },
  INITIAL_STATE,
);
