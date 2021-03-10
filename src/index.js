// require("dotenv").config();
import React from "react";
import {LogBox} from 'react-native';
import { Provider as PaperProvider } from "react-native-paper";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import logger from "redux-logger";
import AppNavigator from "./navigators/AppNavigator";
import NavigationService from "./utils/navigationService";

import Reducers from "./reducers";

const store = createStore(Reducers, applyMiddleware(logger, thunk));

export default function Main() {
  LogBox.ignoreAllLogs()
  const theme = {
    roundness: 2,
    colors: {
      primary: "#3498db",
      accent: "#f1c40f"
    },
    fonts: "regular"
  };
  const prefix = "reno://";
  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <AppNavigator
          uriPrefix={prefix}
          ref={navigatorRef => {
            NavigationService.setTopLevelNavigator(navigatorRef);
          }}
        />
      </PaperProvider>
    </Provider>
  );
}
