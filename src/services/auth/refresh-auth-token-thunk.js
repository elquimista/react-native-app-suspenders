import { createStructuredSelector } from 'reselect';
import {
  increaseUiBlockerCount,
  decreaseUiBlockerCount
} from 'services/general';
import navigationThunk from 'services/navigation/navigation-thunk';
import {
  retokQueueSelector,
  retokQueueEmptySelector,
  setAuthToken,
  pushToRetokQueue,
  clearRetokQueue
} from './auth';

const { navigate } = navigationThunk;
const selectors = createStructuredSelector({
  isRetokQueueEmpty: retokQueueEmptySelector
});

export default function refreshAuthToken(payload) {
  return async (dispatch, getState) => {
    const { isRetokQueueEmpty } = selectors(getState());

    dispatch(increaseUiBlockerCount());

    if (isRetokQueueEmpty) {
      dispatch(pushToRetokQueue(payload));
      try {
        // Put your own refresh token logic (api call) here...
        dispatch(setAuthToken('anewlyrefreshedtoken'));
        await retokQueueSelector(getState()).reduce(
          async (prev, thunkAction) => {
            await prev;
            await dispatch(thunkAction);
          },
          Promise.resolve()
        );
      } catch (err) {
        dispatch(setAuthToken(null));
        dispatch(navigate(['root', '/login']));
      } finally {
        dispatch(clearRetokQueue());
      }
    } else {
      dispatch(pushToRetokQueue(payload));
    }

    dispatch(decreaseUiBlockerCount());
  };
}
