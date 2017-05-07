import {combineReducers} from "redux";

import {default as installedApps} from "../installed-apps/reducer";

const reducer = combineReducers<AppState>({
    installedApps
});

export default reducer;