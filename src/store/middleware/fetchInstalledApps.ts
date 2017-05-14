import {Middleware,MiddlewareAPI,Dispatch} from "redux";

import {requestRegisteredApps} from "../actions/registered-apps";
import {requestSystemApps} from "../actions/system-apps";

export const fetchInstalledApps: Middleware = (store: MiddlewareAPI<AppState>) => (next: Dispatch<AppState>) => (action: AppAction) =>
{
    const result = next(action);

    if (action.type === "REQUEST_INSTALLED_APPS")
    {
        store.dispatch(requestRegisteredApps());
        store.dispatch(requestSystemApps());
    }

    return result;
};