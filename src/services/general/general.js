import { createAction } from 'redux-actions';
import { handleActionsEx } from 'utils';

// action creators
export const increaseUiBlockerCount = createAction('INC_UI_BLOCKER_COUNT');
export const decreaseUiBlockerCount = createAction('DEC_UI_BLOCKER_COUNT');

// reducer
const initialState = {
  uiBlockerCount: 0
};
const reducer = {
  INC_UI_BLOCKER_COUNT: state => ({
    ...state,
    uiBlockerCount: state.uiBlockerCount + 1
  }),
  DEC_UI_BLOCKER_COUNT: state => ({
    ...state,
    uiBlockerCount: Math.max(state.uiBlockerCount - 1, 0)
  })
};
export default handleActionsEx(reducer, initialState);

// selectors
export const busyStateSelector = state => state.general.uiBlockerCount > 0;
