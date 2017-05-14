import {Middleware,MiddlewareAPI,Dispatch} from "redux";

import {receiveSystemApps} from "../actions/system-apps";

export function fetchSystemApps(systemAppProvider: SystemAppProvider): Middleware
{
    function fetchSystemApps(store: MiddlewareAPI<AppState>, action: RequestSystemAppsAction): void
    {
        systemAppProvider.loadApps()
            .then(systemApps => store.dispatch(receiveSystemApps(systemApps)));
    }

    const middleware: Middleware = (store: MiddlewareAPI<AppState>) => (next: Dispatch<AppState>) => (action: AppAction) =>
    {
        switch(action.type)
        {
            case "REQUEST_SYSTEM_APPS": fetchSystemApps(store, action as RequestSystemAppsAction); break;
        }

        return next(action);
    };

    return middleware;
}