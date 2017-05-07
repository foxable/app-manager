import * as path from "path";

import {app,BrowserWindow} from "electron";
import {createStore,applyMiddleware} from "redux";

import {appReducer,initialAppState,forwardToRenderer,replayActionMain} from "../store";
import createFetchInstalledApps from "./store/middleware/createFetchInstalledApps";
import AppRegistry from "./registry/AppRegistry";
import WindowsAppProvider from "./system/WindowsAppProvider";
import Main from "./Main";

// app registry
const appsPath = path.join(app.getAppPath(), "storage", "apps");
const appRegistry = new AppRegistry(appsPath);

// system app provider
const systemAppProvider = new WindowsAppProvider();

// store
const fetchInstalledApps = createFetchInstalledApps(appRegistry, systemAppProvider);
const store = createStore<AppState>(appReducer, initialAppState, applyMiddleware(forwardToRenderer, fetchInstalledApps));
replayActionMain(store);

Main.main(app, BrowserWindow, store, true);
