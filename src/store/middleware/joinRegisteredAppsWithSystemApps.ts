import {Middleware,MiddlewareAPI,Dispatch} from "redux";

import {receiveInstalledApps} from "../actions/installed-apps";

function contains(value: string, searchedValue: string): boolean
{
    return value.toLowerCase().indexOf(searchedValue.toLowerCase()) > -1;
}

function join(registeredApps: RegisteredApp[], systemApps: SystemApp[]): (RegisteredApp & SystemApp)[]
{
    const installedApps: (RegisteredApp & SystemApp)[] = [];

    registeredApps.forEach(registeredApp =>
    {
        const systemApp = systemApps.find(_ => contains(_.name, registeredApp.name));

        if (systemApp)
        {
            installedApps.push({ ...systemApp, ...registeredApp });
        }
    });

    return installedApps;
}

export const joinRegisteredAppsWithSystemApps: Middleware = (store: MiddlewareAPI<AppState>) => (next: Dispatch<AppState>) => (action: AppAction) =>
{
    const result = next(action);

    if (!(action.type === "RECEIVE_REGISTERED_APPS" || action.type === "RECEIVE_SYSTEM_APPS"))
        return result;

    const state = store.getState();

    if (state.registeredApps.isFetching || state.systemApps.isFetching)
        return result;

    const installedApps = join(state.registeredApps.apps, state.systemApps.apps);

    store.dispatch(receiveInstalledApps(installedApps));

    return result;
};