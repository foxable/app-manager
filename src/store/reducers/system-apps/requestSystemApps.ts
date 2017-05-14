import {toFetching} from "../../helpers/toFetching";

export function requestSystemApps(state: AppState, action: RequestSystemAppsAction): AppState
{
    return {
        ...state,
        systemApps: toFetching(state.systemApps),
        installedApps: toFetching(state.installedApps)
    };
}