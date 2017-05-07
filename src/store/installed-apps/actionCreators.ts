/// <reference path="actions.d.ts"/>

export function requestInstalledApps(): RequestInstalledAppsAction
{
    return { type: "REQUEST_INSTALLED_APPS" };
}

export function receiveInstalledApps(apps: InstalledApp[]): ReceiveInstalledAppsAction
{
    return { type: "RECEIVE_INSTALLED_APPS", payload: { apps } };
}

export function requestLatestVersion(appId: string): RequestLatestVersionAction
{
    return { type: "REQUEST_LATEST_VERSION", payload: { appId } };
}

export function receiveLatestVersion(appId: string, latestVersion: string, isOutdated: boolean): ReceiveLatestVersionAction
{
    return { type: "RECEIVE_LATEST_VERSION", payload: { appId, latestVersion, isOutdated } };
}