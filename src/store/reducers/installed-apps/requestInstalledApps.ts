import {toFetching} from "../../helpers/toFetching";

export function requestInstalledApps(state: AppState, action: RequestInstalledAppsAction): AppState
{
    return {
        ...state,
        installedApps: toFetching(state.installedApps)
    };
}