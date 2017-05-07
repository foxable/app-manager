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

// Event Parameters
declare interface FetchInstalledAppsParam 
{    
}

declare type InstalledAppsFetchedParam = InstalledApp[];

declare interface LatestVersionFetchedParam
{
    id: string;
    latestVersion: string;
    isOutdated: boolean;
}