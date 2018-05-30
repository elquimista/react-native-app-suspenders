import _ from 'lodash';
import { createAction, handleActions } from 'redux-actions';
import { createSelector } from 'reselect';
import { NavigationActions } from 'react-navigation';

// action creators
export const addNavigator = createAction('ADD_NAVIGATOR');
export const removeNavigator = createAction('REMOVE_NAVIGATOR');

// reducer
const initialState = {
  navigators: {}
};
const reducer = {
  ADD_NAVIGATOR: (state, { payload: { key, navigator } }) => ({
    ...state,
    navigators: { ...state.navigators, [key]: navigator }
  }),
  REMOVE_NAVIGATOR: (state, { payload: key }) => ({
    ...state,
    navigators: _.omit(state.navigators, [key])
  })
};
export default handleActions(reducer, initialState);

// selectors
export const navigatorSelector = key => state =>
  state.navigation.navigators[key];

export const getNavNavigateFunction = navKey =>
  createSelector(
    navigatorSelector(navKey),
    navigator =>
      navigator
        ? (routeName, params) => {
            const { routes, index } = navigator.state.nav;
            const { key, routeName: currentRouteName } = routes[index];
            const type = NavigationActions.NAVIGATE;
            const navAction =
              routeName === currentRouteName
                ? NavigationActions.setParams({ key, params })
                : NavigationActions.navigate({ routeName, params, type });
            navigator.dispatch(navAction);
          }
        : null
  );

export const getNavGoBackFunction = navKey =>
  createSelector(
    navigatorSelector(navKey),
    navigator =>
      navigator
        ? (...args) => navigator.dispatch(NavigationActions.back(...args))
        : null
  );
