/// <reference path="../store.d.ts"/>

import {ipcRenderer} from "electron";
import {Middleware,MiddlewareAPI,Dispatch} from "redux";

import Events from "../actions/events";
import isLocalAction from "../helpers/isLocalAction";

const forwardToMain: Middleware = (store: MiddlewareAPI<AppState>) => (next: Dispatch<AppState>) => (action: Action) =>
{
    if (isLocalAction(action))
        return next(action);

    ipcRenderer.send(Events.REDUX_SYNC, action);
};

export default forwardToMain;