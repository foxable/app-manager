import {toFetched} from "../../helpers/toFetched";

export function receiveRegisteredApps(state: AppState, action: ReceiveRegisteredAppsAction): AppState
{
    return {
        ...state,
        registeredApps: toFetched(action.payload.apps)
    };
}