import {ipcRenderer} from "electron";
import {Store} from "redux";

import Events from "../actions/events";

export default function(store: Store<AppState>): void
{
    ipcRenderer.on(Events.REDUX_SYNC, (event, action: Action) => store.dispatch(action));
}