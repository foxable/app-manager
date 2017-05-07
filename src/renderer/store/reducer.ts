import {combineReducers} from "redux";

import {reducer as installedApps,initialState as initialInstalledAppsState} from "./installed-apps/reducer";

export const initialState: AppState = {
    installedApps: initialInstalledAppsState
};

export const reducer = combineReducers<AppState>({
    installedApps
});