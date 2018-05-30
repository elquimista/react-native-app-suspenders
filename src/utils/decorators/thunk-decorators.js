import { createStructuredSelector } from 'reselect';
import {
  increaseUiBlockerCount,
  decreaseUiBlockerCount
} from 'services/general';
import navigationThunk from 'services/navigation/navigation-thunk';
import {
  loggedInSelector,
  authTokenAlmostExpiredSelector
} from 'services/auth';
import refreshAuthToken from 'services/auth/refresh-auth-token-thunk';
import { createMethodDecorator } from './';

/* eslint-disable func-names, no-param-reassign */

const { navigate } = navigationThunk;
const createThunkDecorator = createHot =>
  createMethodDecorator(
    method =>
      function(payload) {
        const thunk = Reflect.apply(method, this, [payload]);
        return (dispatch, getState) => createHot(dispatch, getState, thunk);
      }
  );

export function connectThunk(selectors) {
  const mapStateToProps = createStructuredSelector(selectors);
  return createThunkDecorator((dispatch, getState, thunk) =>
    thunk(dispatch, getState, mapStateToProps(getState()))
  );
}

export const blockUI = createThunkDecorator(
  async (dispatch, getState, thunk) => {
    try {
      dispatch(increaseUiBlockerCount());
      await thunk(dispatch, getState);
    } finally {
      dispatch(decreaseUiBlockerCount());
    }
  }
);

export const requiresAuth = createThunkDecorator(
  async (dispatch, getState, thunk) => {
    if (!loggedInSelector(getState())) {
      dispatch(navigate(['root', '/login']));
    } else if (authTokenAlmostExpiredSelector(getState())) {
      dispatch(refreshAuthToken(thunk));
    } else {
      await thunk(dispatch, getState);
    }
  }
);
