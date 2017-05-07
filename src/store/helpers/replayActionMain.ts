import {ipcMain} from "electron";
import {Store} from "redux";

import {REDUX_SYNC} from "../actions/events";

export default function replayActionMain(store: Store<AppState>): void
{
    ipcMain.on(REDUX_SYNC, (event, action: AppAction) => store.dispatch(action));
}