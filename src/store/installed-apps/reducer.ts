/// <reference path="../store.d.ts"/>
/// <reference path="actions.d.ts"/>

import {Reducer} from "redux";

function requestInstalledApps(state: InstalledAppsState, action: RequestInstalledAppsAction): InstalledAppsState
{
    return {
        ...state,
        isFetching: true
    };
}

function receiveInstalledApps(state: InstalledAppsState, action: ReceiveInstalledAppsAction): InstalledAppsState
{
    return {
        ...state,
        isFetching: false,
        apps: action.payload.apps.map(app => ({ ...app, isFetchingVersion: false }))
    };
}

function requestLatestVersion(state: InstalledAppsState, action: RequestLatestVersionAction): InstalledAppsState
{
    return {
        ...state,
        apps: state.apps.map(app => {
            if (app.id === action.payload.appId)
                return { ...app, isFetchingVersion: true };
            else
                return app;
        })
    };
}

function receiveLatestVersion(state: InstalledAppsState, action: ReceiveLatestVersionAction): InstalledAppsState
{
    return {
        ...state,
        apps: state.apps.map(app => {
            if (app.id === action.payload.appId)
                return { ...app, isFetchingVersion: false, latestVersion: action.payload.latestVersion, isOutdated: action.payload.isOutdated };
            else
                return app;
        })
    };
}

export const initialState: InstalledAppsState = {
    isFetching: true,
    apps: []
};

export const reducer: Reducer<InstalledAppsState> = (state: InstalledAppsState = initialState, action: Action) =>
{
    switch (action.type)
    {
        case "REQUEST_INSTALLED_APPS": return requestInstalledApps(state, action as RequestInstalledAppsAction);
        case "RECEIVE_INSTALLED_APPS": return receiveInstalledApps(state, action as ReceiveInstalledAppsAction);
        case "REQUEST_LATEST_VERSION": return requestLatestVersion(state, action as RequestLatestVersionAction);
        case "RECEIVE_LATEST_VERSION": return receiveLatestVersion(state, action as ReceiveLatestVersionAction);
        default: return state;
    }
};