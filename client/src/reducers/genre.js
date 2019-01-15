
import { Map } from 'immutable';
import { createAction, handleActions } from 'redux-actions';
import {
  GET_GENRES_ACTION,
  GET_SUGGESTED_PEOPLE_GENRE_ACTION,
} from '../consts/actions';

// CREATE ACTIONS
export const getGenres = createAction(GET_GENRES_ACTION);
export const getSuggestedPeople = createAction(GET_SUGGESTED_PEOPLE_GENRE_ACTION);

// SET INITIAL STATE
const INITIAL_STATE = Map({
  genres: [],
  suggestedPeople: [],
});

// WRITE HANDLERS FOR ACTIONS
export default handleActions(
  {

    [GET_GENRES_ACTION](state, { payload }) {
      return state.set('genres', payload);
    },
    [GET_SUGGESTED_PEOPLE_GENRE_ACTION](state, { payload }) {
      const suggestedPeople = payload || [];
      return state.set('suggestedPeople', suggestedPeople);
    },
  },
  INITIAL_STATE,
);
