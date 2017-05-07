import {ipcRenderer} from "electron";
import {Store} from "redux";

import {REDUX_SYNC} from "../actions/events";

export default function replayActionRenderer(store: Store<AppState>): void
{
    ipcRenderer.on(REDUX_SYNC, (event, action: AppAction) => store.dispatch(action));
}