import { Dimensions } from 'react-native';
import { handleActions } from 'redux-actions';

export const dimension = Dimensions.get('screen');

export const screen = {
  geThan(deviceName) {
    if (/iPhone (5|5s|5c|SE)\b/i.test(deviceName)) {
      return dimension.scale > 2 || dimension.height >= 568;
    } else if (/iPhone [6-8]s?(?!\+)\b/i.test(deviceName)) {
      return dimension.scale > 2 || dimension.height >= 667;
    } else if (/iPhone [6-8]s?\+/i.test(deviceName)) {
      return dimension.scale > 2;
    } else if (/iPhone X\b/i.test(deviceName)) {
      return dimension.scale > 2 && dimension.height >= 812;
    }
    throw new Error('screen#geThan - unknown device name');
  }
};

export function handleActionsEx(reducer, initialState) {
  const enhancedReducer = { ...reducer, RESET: () => initialState };
  return handleActions(enhancedReducer, initialState);
}
