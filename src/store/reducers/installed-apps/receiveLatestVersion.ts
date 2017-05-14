export function receiveLatestVersion(state: AppState, action: ReceiveLatestVersionAction): AppState
{
    return {
        ...state,
        installedApps: {
            ...state.installedApps,
            apps: state.installedApps.apps.map(app => {
                if (app.id === action.payload.appId)
                    return { ...app, isFetchingVersion: false, latestVersion: action.payload.latestVersion, isOutdated: action.payload.isOutdated };
                else
                    return app;
            })
        }
    };
}