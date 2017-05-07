/// <reference path="actions.d.ts"/>

import {Action,Reducer} from "redux";

function loadApps(state: InstalledAppsState, action: LoadAppsAction): InstalledAppsState
{
    return {
        isLoading: true,
        apps: state.apps
    };
}

function updateApps(state: InstalledAppsState, action: UpdateAppsAction): InstalledAppsState
{
    return {
        isLoading: false,
        apps: action.apps
    };
}

function updateLatestVersion(state: InstalledAppsState, action: UpdateLatestVersionAction): InstalledAppsState
{
    return {
        isLoading: false,
        apps: state.apps.map(app => {
            if (app.id === action.appId)
                return { ...app, latestVersion: action.latestVersion, isOutdated: action.isOutdated };
            else
                return app;
        })
    };
}

export const initialState: InstalledAppsState = {
    isLoading: true,
    apps: []
};

export const reducer: Reducer<InstalledAppsState> = (state: InstalledAppsState = initialState, action: Action) =>
{
    switch (action.type)
    {
        case "LOAD_INSTALLED_APPS": return loadApps(state, action as LoadAppsAction);
        case "UPDATE_INSTALLED_APPS": return updateApps(state, action as UpdateAppsAction);
        case "UPDATE_LATEST_VERSION": return updateLatestVersion(state, action as UpdateLatestVersionAction);
        default: return state;
    }
};