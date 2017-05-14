import initialAppListState from "./appList";

const initialAppState: AppState = {
    registeredApps: initialAppListState,
    systemApps: initialAppListState,
    installedApps: initialAppListState
};

export default initialAppState;