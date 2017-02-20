declare interface RegisteredApp
{
    readonly id: string;
    readonly name: string;
    readonly websiteUrl: string;
    readonly downloadUrl: string;
    readonly latestVersion: string;
}

declare interface InstalledApp extends RegisteredApp
{
    readonly installedVersion: string;    
}
