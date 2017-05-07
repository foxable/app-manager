import {ipcRenderer} from "electron";
import {Middleware,MiddlewareAPI,Dispatch} from "redux";

import {REDUX_SYNC} from "../actions/events";

const forwardToMain: Middleware = (store: MiddlewareAPI<AppState>) => (next: Dispatch<AppState>) => (action: AppAction) =>
{
    if (action.scope === "local")
        return next(action);

    ipcRenderer.send(REDUX_SYNC, action);
};

export default forwardToMain;