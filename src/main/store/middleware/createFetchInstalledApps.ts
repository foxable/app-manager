import {Middleware,MiddlewareAPI,Dispatch} from "redux";

import {receiveInstalledApps,requestLatestVersion,receiveLatestVersion,createLocalAction} from "../../../store";
import Utils from "../../Utils";
import AppRegistry from "../../registry/AppRegistry";
import VersionProviderFactory from "../../version-provider/VersionProviderFactory";
import VersionComparer from "../../VersionComparer";

export default function createFetchInstalledApps(appRegistry: AppRegistry, systemAppProvider: SystemAppProvider): Middleware
{
    function initApp(app: SystemApp & RegisteredApp): InstalledApp
    {
        return { ...app, latestVersion: null, isOutdated: false };
    }

    function fetchInstalledApps(store: MiddlewareAPI<AppState>, action: RequestInstalledAppsAction): AppAction
    {
        Promise.all([systemAppProvider.loadApps(false), appRegistry.loadApps(false)])
            .then(([systemApps, registeredApps]) =>
            {
                const installedApps = Utils
                    .joinBy(systemApps, registeredApps, (s, r) => Utils.contains(s.name, r.name))
                    .map(app => initApp(app));

                store.dispatch(receiveInstalledApps(installedApps));

                installedApps.forEach(app => store.dispatch(createLocalAction(requestLatestVersion(app.id))));
            });

        return action;
    }

    function fetchLatestVersion(store: MiddlewareAPI<AppState>, action: RequestLatestVersionAction): AppAction
    {
        const app = store.getState().installedApps.apps.find(_ => _.id === action.payload.appId);
        const versionProvider = appRegistry.loadVersionProvider(app.id);
        VersionProviderFactory.create(versionProvider).getVersion().then(latestVersion =>
        {            
            const isOutdated = new VersionComparer(app.installedVersion).isLesserThan(latestVersion);
            store.dispatch(receiveLatestVersion(app.id, latestVersion, isOutdated));
        });

        return action;       
    }

    const middleware: Middleware = (store: MiddlewareAPI<AppState>) => (next: Dispatch<AppState>) => (action: AppAction) =>
    {
        switch(action.type)
        {
            case "REQUEST_INSTALLED_APPS": return next(fetchInstalledApps(store, action as RequestInstalledAppsAction));
            case "REQUEST_LATEST_VERSION": return next(fetchLatestVersion(store, action as RequestLatestVersionAction));
            default: return next(action);
        }        
    };

    return middleware;
}