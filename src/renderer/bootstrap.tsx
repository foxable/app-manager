import {ipcRenderer} from "electron";
import {createStore} from "redux";

import * as React from "react";
import {Provider} from "react-redux";
import * as ReactDOM from "react-dom";
import {HashRouter} from "react-router-dom";

import Events from "../events";
import {updateInstalledApps,updateLatestVersion} from "./store/actionCreators";
import {reducer,initialState} from "./store/reducer";
import {App} from "./App";

const store = createStore<AppState>(reducer, initialState);
// register events
ipcRenderer.on(Events.INSTALLED_APPS_FETCHED, (_, apps: InstalledAppsFetchedParam) => store.dispatch(updateInstalledApps(apps)));
ipcRenderer.on(Events.LATEST_VERSION_FETCHED, (_, { id, latestVersion, isOutdated }: LatestVersionFetchedParam) => store.dispatch(updateLatestVersion(id, latestVersion, isOutdated)));

ReactDOM.render(
    <HashRouter>
      <Provider store={store}>
        <App/>
      </Provider>
    </HashRouter>,
    document.getElementById("app-manager-root")
);
