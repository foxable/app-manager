import {toFetching} from "../../helpers/toFetching";

export function requestRegisteredApps(state: AppState, action: RequestRegisteredAppsAction): AppState
{
    return {
        ...state,
        registeredApps: toFetching(state.registeredApps),
        installedApps: toFetching(state.installedApps)
    };
}