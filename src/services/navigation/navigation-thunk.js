import autobind from 'autobind-decorator';
import { getNavNavigateFunction, getNavGoBackFunction } from './navigation';

export default new class NavigationThunk {
  @autobind
  navigate([key, routeName, params]) {
    return (dispatch, getState) => {
      const navigate = getNavNavigateFunction(key)(getState());
      navigate(routeName, params);
    };
  }

  @autobind
  goBack([key]) {
    return (dispatch, getState) => {
      const goBack = getNavGoBackFunction(key)(getState());
      goBack();
    };
  }
}();
