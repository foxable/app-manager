declare interface RegisteredApp
{
    readonly id: string;
    readonly name: string;
    readonly websiteUrl: string;
    readonly downloadUrl: string;    
}

declare interface SystemApp
{
    readonly name: string;
    readonly installedVersion: string;
}

// States
declare interface AppState
{
    registeredApps: RegisteredAppsState;
    systemApps: SystemAppsState;
    installedApps: InstalledAppsState;
}

declare interface AppListState<T>
{
    isFetching: boolean;
    apps: T[];
}

type RegisteredAppsState = AppListState<RegisteredApp>;
type SystemAppsState = AppListState<SytemApp>;
type InstalledAppsState = AppListState<InstalledApp>;

declare interface LatestVersionState
{
    readonly isFetchingVersion: boolean;
    readonly latestVersion: string | null;
    readonly isOutdated: boolean;
}

declare interface InstalledApp extends RegisteredApp, SystemApp, LatestVersionState
{
}

// Actions
declare interface AppAction
{
    type: string;
    scope?: "local";
}

// Registered Apps
declare interface RequestRegisteredAppsAction extends AppAction
{
    type: "REQUEST_REGISTERED_APPS";
}

declare interface ReceiveRegisteredAppsAction extends AppAction
{
    type: "RECEIVE_REGISTERED_APPS";
    payload: {
        apps: RegisteredApp[];
    };
}

// System Apps
declare interface RequestSystemAppsAction extends AppAction
{
    type: "REQUEST_SYSTEM_APPS";
}

declare interface ReceiveSystemAppsAction extends AppAction
{
    type: "RECEIVE_SYSTEM_APPS";
    payload: {
        apps: SystemApp[];
    };
}

// Installed Apps
declare interface RequestInstalledAppsAction extends AppAction
{
    type: "REQUEST_INSTALLED_APPS";
}

declare interface ReceiveInstalledAppsAction extends AppAction
{
    type: "RECEIVE_INSTALLED_APPS";
    payload: {
        apps: (RegisteredApp & SystemApp)[];
    };
}

// Latest Version
declare interface RequestLatestVersionAction extends AppAction
{
    type: "REQUEST_LATEST_VERSION";
    payload: {
        appId: string;
    };
}

declare interface ReceiveLatestVersionAction extends AppAction
{
    type: "RECEIVE_LATEST_VERSION";
    payload: {
        appId: string;
        latestVersion: string;
        isOutdated: boolean;
    };
}