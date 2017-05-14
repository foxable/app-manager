import * as path from "path";

import {app,BrowserWindow} from "electron";
import {createStore,applyMiddleware} from "redux";

import {appReducer,initialAppState,forwardToRenderer,replayActionMain,fetchRegisteredApps,fetchSystemApps,fetchInstalledApps,joinRegisteredAppsWithSystemApps} from "../store";
import AppRegistry from "./registry/AppRegistry";
import WindowsAppProvider from "./system/WindowsAppProvider";
import Main from "./Main";

// app registry
const appsPath = path.join(app.getAppPath(), "storage", "apps");
const appRegistry = new AppRegistry(appsPath);

// system app provider
const systemAppProvider = new WindowsAppProvider();

// store
const store = createStore<AppState>(
    appReducer,
    initialAppState,
    applyMiddleware(
        forwardToRenderer,
        fetchRegisteredApps(appRegistry),
        fetchSystemApps(systemAppProvider),
        fetchInstalledApps,
        joinRegisteredAppsWithSystemApps
    )
);
replayActionMain(store);

Main.main(app, BrowserWindow, store, true);
