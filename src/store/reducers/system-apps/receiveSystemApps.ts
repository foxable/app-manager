import {toFetched} from "../../helpers/toFetched";

export function receiveSystemApps(state: AppState, action: ReceiveSystemAppsAction): AppState
{
    return {
        ...state,
        systemApps: toFetched(action.payload.apps)
    };
}