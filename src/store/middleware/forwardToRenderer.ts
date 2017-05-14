import {BrowserWindow} from "electron";
import {Middleware,MiddlewareAPI,Dispatch} from "redux";

import {REDUX_SYNC} from "../actions/events";
import {createLocalAction} from "../helpers/createLocalAction";

export const forwardToRenderer: Middleware = (store: MiddlewareAPI<AppState>) => (next: Dispatch<AppState>) => (action: AppAction) =>
{
    const openWindows = BrowserWindow.getAllWindows();
    openWindows.forEach(window => window.webContents.send(REDUX_SYNC, createLocalAction(action)));

    return next(action);
};