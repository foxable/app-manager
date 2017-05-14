export function requestLatestVersion(state: AppState, action: RequestLatestVersionAction): AppState
{
    return {
        ...state,
        installedApps: {
            ...state.installedApps,
            apps: state.installedApps.apps.map(app => {
                if (app.id === action.payload.appId)
                    return { ...app, isFetchingVersion: true };
                else
                    return app;
            })
        }
    };
}