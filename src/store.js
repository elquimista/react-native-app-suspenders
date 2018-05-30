import { createStore, compose, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { persistStore } from 'redux-persist';
import reducer from 'services/reducer';

const enhancers = [applyMiddleware(thunkMiddleware)];

/* eslint-disable no-underscore-dangle */
if (
  process.env.NODE_ENV === 'development' &&
  window.__REDUX_DEVTOOLS_EXTENSION__
) {
  enhancers.push(window.__REDUX_DEVTOOLS_EXTENSION__());
}
/* eslint-enable */

const store = createStore(reducer, compose(...enhancers));
const persistor = persistStore(store);

export { persistor };
export default store;
