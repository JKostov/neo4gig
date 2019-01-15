
import { Map } from 'immutable';
import { createAction, handleActions } from 'redux-actions';
import {
  GET_BANDS_ACTION,
  GET_SUGGESTED_PEOPLE_BAND_ACTION,
} from '../consts/actions';

// CREATE ACTIONS
export const getBands = createAction(GET_BANDS_ACTION);
export const getSuggestedPeople = createAction(GET_SUGGESTED_PEOPLE_BAND_ACTION);

// SET INITIAL STATE
const INITIAL_STATE = Map({
  bands: [],
  suggestedPeople: [],
});

// WRITE HANDLERS FOR ACTIONS
export default handleActions(
  {

    [GET_BANDS_ACTION](state, { payload }) {
      return state.set('bands', payload);
    },
    [GET_SUGGESTED_PEOPLE_BAND_ACTION](state, { payload }) {
      const suggestedPeople = payload || [];
      return state.set('suggestedPeople', suggestedPeople);
    },
  },
  INITIAL_STATE,
);
