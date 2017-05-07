import {combineReducers} from "redux";

import {reducer as installedApps} from "../../installed-apps/reducer";

const reducer = combineReducers<AppState>({
    installedApps
});

export default reducer;