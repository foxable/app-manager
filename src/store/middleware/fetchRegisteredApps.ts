import {Middleware,MiddlewareAPI,Dispatch} from "redux";

import {receiveRegisteredApps,requestLatestVersion,receiveLatestVersion} from "../actions/registered-apps";

import AppRegistry from "../../main/registry/AppRegistry";
import VersionProviderFactory from "../../main/version-provider/VersionProviderFactory";
import VersionComparer from "../../main/VersionComparer";

export function fetchRegisteredApps(appRegistry: AppRegistry): Middleware
{
    async function fetchRegisteredApps(store: MiddlewareAPI<AppState>, action: RequestRegisteredAppsAction): Promise<void>
    {
        const registeredApps = await appRegistry.loadApps();

        store.dispatch(receiveRegisteredApps(registeredApps));
    }

    async function fetchLatestVersion(store: MiddlewareAPI<AppState>, action: RequestLatestVersionAction): Promise<void>
    {
        const app = store.getState().installedApps.apps.find(_ => _.id === action.payload.appId);

        if (!app) return;

        const versionProvider = appRegistry.loadVersionProvider(app.id);
        const versionProviderAdapter = VersionProviderFactory.create(versionProvider);

        const latestVersion = await versionProviderAdapter.getVersion();        
        const isOutdated = new VersionComparer(app.installedVersion).isLesserThan(latestVersion);

        store.dispatch(receiveLatestVersion(app.id, latestVersion, isOutdated));     
    }

    function fetchLatestVersions(store: MiddlewareAPI<AppState>): void
    {
        const state = store.getState();

        state.installedApps.apps
            .filter(_ => _.latestVersion === null)
            .forEach(app => store.dispatch(requestLatestVersion(app.id)));
    }

    const middleware: Middleware = (store: MiddlewareAPI<AppState>) => (next: Dispatch<AppState>) => (action: AppAction) =>
    {
        switch(action.type)
        {
            case "REQUEST_REGISTERED_APPS": fetchRegisteredApps(store, action as RequestRegisteredAppsAction); break;
            case "REQUEST_LATEST_VERSION": fetchLatestVersion(store, action as RequestLatestVersionAction); break;
        }

        const result = next(action);

        switch(action.type)
        {
            case "RECEIVE_INSTALLED_APPS": fetchLatestVersions(store); break;
        }

        return result;
    };

    return middleware;
}