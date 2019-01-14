
import { Map } from 'immutable';
import { createAction, handleActions } from 'redux-actions';
import {
  GET_FEED_ACTION,
  SET_ATTENDANCE_CHANGE_ACTION, SET_FOLLOWING_CHANGE_ACTION, SET_INTERESTED_CHANGE_ACTION,
} from '../consts/actions';

// CREATE ACTIONS
export const getFeed = createAction(GET_FEED_ACTION);
export const changeAttendance = createAction(SET_ATTENDANCE_CHANGE_ACTION);
export const changeFollow = createAction(SET_FOLLOWING_CHANGE_ACTION);
export const changeInterest = createAction(SET_INTERESTED_CHANGE_ACTION);

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
