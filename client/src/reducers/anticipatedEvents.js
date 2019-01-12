
import { Map } from 'immutable';
import { createAction, handleActions } from 'redux-actions';
import { GET_ANTICIPATED_EVENTS_ACTION } from '../consts/actions';

// CREATE ACTIONS
export const getAnticipatedEvents = createAction(GET_ANTICIPATED_EVENTS_ACTION);

// SET INITIAL STATE
const INITIAL_STATE = Map({
  anticipatedEvents: [],
});

// WRITE HANDLERS FOR ACTIONS
export default handleActions(
  {

    [GET_ANTICIPATED_EVENTS_ACTION](state, { payload }) {
      return state.set('anticipatedEvents', payload);
    },
  },
  INITIAL_STATE,
);
