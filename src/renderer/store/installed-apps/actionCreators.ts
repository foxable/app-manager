/// <reference path="actions.d.ts"/>

export function loadInstalledApps(): LoadAppsAction
{
    return { type: "LOAD_INSTALLED_APPS" };
}

export function updateInstalledApps(apps: InstalledApp[]): UpdateAppsAction
{
    return { type: "UPDATE_INSTALLED_APPS", apps };
}

export function updateLatestVersion(appId: string, latestVersion: string, isOutdated: boolean): UpdateLatestVersionAction
{
    return { type: "UPDATE_LATEST_VERSION", appId, latestVersion, isOutdated };
}