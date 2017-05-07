import {ipcMain} from "electron";
import {Store} from "redux";

import Events from "../actions/events";

export default function(store: Store<AppState>): void
{
    ipcMain.on(Events.REDUX_SYNC, (event, action: Action) => store.dispatch(action));
}