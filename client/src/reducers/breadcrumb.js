
import { Map } from 'immutable';
import { createAction, handleActions } from 'redux-actions';
import { SET_BREADCRUMB_ACTION } from '../consts/actions';

// CREATE ACTIONS
export const setBreadcrumb = createAction(SET_BREADCRUMB_ACTION);

// SET INITIAL STATE
const INITIAL_STATE = Map({
  sections: [],
});

// WRITE HANDLERS FOR ACTIONS
export default handleActions(
  {
    [SET_BREADCRUMB_ACTION](state, { payload }) {
      return state.set('sections', payload);
    },
  },
  INITIAL_STATE,
);
