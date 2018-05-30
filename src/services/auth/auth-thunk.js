import autobind from 'autobind-decorator';
import { Alert } from 'react-native';
import {
  connectThunk,
  blockUI,
  requiresAuth
} from 'utils/decorators/thunk-decorators';
import navigationThunk from 'services/navigation/navigation-thunk';
import { authTokenSelector, setAuthToken } from './auth';

const { alert } = Alert;
const { navigate } = navigationThunk;
const withProps = connectThunk({
  authToken: authTokenSelector
});

export default new class AuthThunk {
  @autobind
  @blockUI
  login() {
    return async dispatch => {
      try {
        dispatch(setAuthToken('thisalmostrepresentsmyidentity'));
        dispatch(navigate(['root', '/dashboard']));
      } catch (err) {
        alert(
          'Uh-oh',
          'Failed to authenticate. Please check your login credentials.'
        );
      }
    };
  }

  @autobind
  @requiresAuth
  @withProps
  logout() {
    return async (dispatch, getState, { authToken }) => {
      if (authToken) {
        dispatch({ type: 'RESET' });
        dispatch(navigate(['root', '/login']));
      }
    };
  }
}();
