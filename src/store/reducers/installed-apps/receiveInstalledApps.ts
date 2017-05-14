import {toFetched} from "../../helpers/toFetched";
import initialLatestVersionState from "../initial-state/latestVersion";

export function receiveInstalledApps(state: AppState, action: ReceiveInstalledAppsAction): AppState
{    
    const installedApps: InstalledApp[] = action.payload.apps.map(app => {
        const lastAppState = state.installedApps.apps.find(_ => _.id === app.id);

        if (lastAppState)
            return { ...lastAppState, ...app };
        else
            return { ...initialLatestVersionState, ...app };
    })

    return {
        ...state,
        installedApps: toFetched(installedApps)
    };
}