declare interface AppState
{
    installedApps: InstalledAppsState;
}

declare interface InstalledAppsState
{
    isLoading: boolean;
    apps: InstalledApp[];
}