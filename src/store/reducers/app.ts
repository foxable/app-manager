import {Reducer} from "redux";

import initialAppState from "./initial-state/app";

import {requestRegisteredApps,receiveRegisteredApps} from "./registered-apps";
import {requestSystemApps,receiveSystemApps} from "./system-apps";
import {requestInstalledApps,receiveInstalledApps,requestLatestVersion,receiveLatestVersion} from "./installed-apps";

export const appReducer: Reducer<AppState> = (state: AppState = initialAppState, action: AppAction) => 
{
    switch (action.type)
    {
        case "REQUEST_REGISTERED_APPS": return requestRegisteredApps(state, action as RequestRegisteredAppsAction);
        case "RECEIVE_REGISTERED_APPS": return receiveRegisteredApps(state, action as ReceiveRegisteredAppsAction);

        case "REQUEST_SYSTEM_APPS": return requestSystemApps(state, action as RequestSystemAppsAction);
        case "RECEIVE_SYSTEM_APPS": return receiveSystemApps(state, action as ReceiveSystemAppsAction);

        case "REQUEST_INSTALLED_APPS": return requestInstalledApps(state, action as RequestInstalledAppsAction);
        case "RECEIVE_INSTALLED_APPS": return receiveInstalledApps(state, action as ReceiveInstalledAppsAction);

        case "REQUEST_LATEST_VERSION": return requestLatestVersion(state, action as RequestLatestVersionAction);
        case "RECEIVE_LATEST_VERSION": return receiveLatestVersion(state, action as ReceiveLatestVersionAction);
        default: return state;
    }
};