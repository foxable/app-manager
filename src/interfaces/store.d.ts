declare interface RegisteredApp
{
    readonly id: string;
    readonly name: string;
    readonly websiteUrl: string;
    readonly downloadUrl: string;    
}

declare interface InstalledApp extends RegisteredApp
{
    readonly installedVersion: string;    
}

// States
declare interface AppState
{
    installedApps: InstalledAppsState;
}

declare interface InstalledAppsState
{
    isFetching: boolean;
    apps: InstalledAppState[];
}

declare interface LatestVersionState
{
    readonly isFetchingVersion: boolean;
    readonly latestVersion: string | null;
    readonly isOutdated: boolean;
}

declare interface InstalledAppState extends InstalledApp, LatestVersionState
{    
}

// Actions
declare interface AppAction
{
    type: string;
    scope?: "local";
}

declare interface RequestInstalledAppsAction extends AppAction
{
    type: "REQUEST_INSTALLED_APPS";
}

declare interface ReceiveInstalledAppsAction extends AppAction
{
    type: "RECEIVE_INSTALLED_APPS";
    payload: {
        apps: InstalledApp[];
    };
}

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