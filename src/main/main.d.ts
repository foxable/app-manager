declare interface InstalledAppProvider
{
    loadInstalledApps(): Promise<InstalledApp[]>;
}

declare type VersionProvider = HtmlVersionProvider;

declare interface HtmlVersionProvider
{
    readonly type: "html";
    readonly url: string;
    getVersion($: CheerioStatic): string;
}

declare interface VersionProviderAdapter
{
    getVersion(): Promise<string>;
}
