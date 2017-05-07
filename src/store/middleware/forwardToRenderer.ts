/// <reference path="../store.d.ts"/>

import {BrowserWindow} from "electron";
import {Middleware,MiddlewareAPI,Dispatch,Action} from "redux";

import Events from "../actions/events";
import createLocalAction from "../helpers/createLocalAction";

const forwardToRenderer: Middleware = (store: MiddlewareAPI<AppState>) => (next: Dispatch<AppState>) => (action: Action) =>
{
    const openWindows = BrowserWindow.getAllWindows();
    openWindows.forEach(window => window.webContents.send(Events.REDUX_SYNC, createLocalAction(action)));

    return next(action);
};

export default forwardToRenderer;