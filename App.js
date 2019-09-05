import React from 'react';
import { StyleSheet, Text, View, YellowBox,KeyboardAvoidingView } from 'react-native';
import MainNavigator from './config/navigation';
import { store, persistor } from './store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import _ from 'lodash';
YellowBox.ignoreWarnings(['Setting a timer']);
const _console = _.clone(console);
console.warn = message => {
  if(message.indexOf('Setting a timer') <= -1) {
    _console.warn(message)
  }
};

export default function App() {
  return (
    <Provider store={store}>
    <MainNavigator />
      </Provider>
  );
}


