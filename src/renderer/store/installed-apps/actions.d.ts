declare interface LoadAppsAction extends Action
{
    type: "LOAD_INSTALLED_APPS";
}

declare interface UpdateAppsAction extends Action
{
    type: "UPDATE_INSTALLED_APPS";
    apps: InstalledApp[];
}

declare interface UpdateLatestVersionAction extends Action
{
    type: "UPDATE_LATEST_VERSION";
    appId: string;
    latestVersion: string;
    isOutdated: boolean;
}