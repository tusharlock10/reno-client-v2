// require("dotenv").config();
import 'react-native-gesture-handler';
import React from 'react';
import {LogBox} from 'react-native';
import {Provider as PaperProvider} from 'react-native-paper';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import {createLogger} from 'redux-logger';
import Router from './navigators/Router';

import Reducers from './reducers';

const logger = createLogger({collapsed: true, duration: true});

const store = createStore(Reducers, applyMiddleware(logger, thunk));

export default function Main() {
  LogBox.ignoreAllLogs();
  const theme = {
    roundness: 2,
    colors: {
      primary: '#3498db',
      accent: '#f1c40f',
    },
    fonts: 'regular',
    animation: {scale: 1},
  };
  const prefix = 'reno://';
  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <Router />
      </PaperProvider>
    </Provider>
  );
}
