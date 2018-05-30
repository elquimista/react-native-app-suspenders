import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import NativeTachyons from 'react-native-style-tachyons';
import { StyleSheet } from 'react-native';
import store, { persistor } from 'store';
import customStyles, { palette } from 'custom-styles';
import Router from 'screens/_Router';

const tachyonOptions = {
  customStyles,
  colors: { palette },
  clsPropName: 'className'
};

NativeTachyons.build(tachyonOptions, StyleSheet);

export default class App extends React.Component {
  render() {
    return pug`
      Provider(store=store)
        PersistGate(persistor=persistor)
          Router
    `;
  }
}
