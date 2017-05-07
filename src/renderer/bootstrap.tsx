import {createStore,applyMiddleware} from "redux";

import * as React from "react";
import {Provider} from "react-redux";
import * as ReactDOM from "react-dom";
import {HashRouter} from "react-router-dom";

import {appReducer,initialAppState,forwardToMain,replayActionRenderer} from "../store";
import {App} from "./App";

const store = createStore<AppState>(appReducer, initialAppState, applyMiddleware(forwardToMain));
replayActionRenderer(store);

ReactDOM.render(
    <HashRouter>
      <Provider store={store}>
        <App/>
      </Provider>
    </HashRouter>,
    document.getElementById("app-manager-root")
);
