/// <reference path="../store.d.ts"/>

declare interface RequestInstalledAppsAction extends Action
{
    type: "REQUEST_INSTALLED_APPS";
}

declare interface ReceiveInstalledAppsAction extends Action
{
    type: "RECEIVE_INSTALLED_APPS";
    payload: {
        apps: InstalledApp[];
    };
}

declare interface RequestLatestVersionAction extends Action
{
    type: "REQUEST_LATEST_VERSION";
    payload: {
        appId: string;
    };
}

declare interface ReceiveLatestVersionAction extends Action
{
    type: "RECEIVE_LATEST_VERSION";
    payload: {
        appId: string;
        latestVersion: string;
        isOutdated: boolean;
    };
}