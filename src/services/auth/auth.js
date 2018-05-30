import { createAction } from 'redux-actions';
import { createSelector } from 'reselect';
import { handleActionsEx } from 'utils';

// action creators
export const setAuthToken = createAction('SET_AUTH_TOKEN');
export const pushToRetokQueue = createAction('PUSH_TO_RETOK_QUEUE');
export const shiftRetokQueue = createAction('SHIFT_RETOK_QUEUE');
export const clearRetokQueue = createAction('CLEAR_RETOK_QUEUE');
export const setUser = createAction('SET_USER');

// reducer
const initialState = {
  token: null,
  retokQueue: [], // queue for actions that require refreshed token
  user: null
};
const reducer = {
  SET_AUTH_TOKEN: (state, { payload }) => ({
    ...state,
    token: payload
  }),
  PUSH_TO_RETOK_QUEUE: (state, { payload }) => ({
    ...state,
    retokQueue: state.retokQueue.concat(payload)
  }),
  SHIFT_RETOK_QUEUE: state => ({
    ...state,
    retokQueue: state.retokQueue.splice(1)
  }),
  CLEAR_RETOK_QUEUE: state => ({
    ...state,
    retokQueue: []
  }),
  SET_USER: (state, { payload }) => ({
    ...state,
    user: payload
  })
};
export default handleActionsEx(reducer, initialState);

// selectors
export const authTokenSelector = state => state.auth.token;

export const loggedInSelector = createSelector(
  authTokenSelector,
  token => token !== null
);

// Put your own token expiry validation logic inside this selector...
export const authTokenAlmostExpiredSelector = () => false;

export const retokQueueSelector = state => state.auth.retokQueue;

export const retokQueueEmptySelector = createSelector(
  retokQueueSelector,
  queue => queue.length === 0
);

export const currentUserSelector = state => state.auth.user;
