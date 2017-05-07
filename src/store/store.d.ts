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
    readonly latestVersion: string | null;
    readonly isOutdated: boolean;
}

declare interface Action
{
    type: string;
    isLocalScope?: boolean;
}

declare interface AppState
{
    installedApps: InstalledAppsState;
}

declare interface InstalledAppsState
{
    isFetching: boolean;
    apps: InstalledAppState[];
}

declare interface InstalledAppState extends InstalledApp
{
    isFetchingVersion: boolean;
}