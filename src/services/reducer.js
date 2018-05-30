import { persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/es/storage';
import {
  createWhitelistFilter,
  createBlacklistFilter
} from 'redux-persist-transform-filter';
import { reducer as form } from 'redux-form';
import general from './general';
import navigation from './navigation';
import auth from './auth';

const persistConfig = {
  storage,
  key: 'root',
  transforms: [
    createWhitelistFilter('form', []),
    createWhitelistFilter('navigation', []),
    createBlacklistFilter('general', ['uiBlockerCount'])
  ]
};

export default persistCombineReducers(persistConfig, {
  form,
  general,
  navigation,
  auth
});
