declare interface AppDescription
{
    readonly name: string;
    readonly websiteUrl: string;
    readonly downloadUrl: string;    
}

declare interface SystemApp
{
    readonly name: string;
    readonly installedVersion: string;
}

declare interface SystemAppProvider
{
    loadApps(forceReload: boolean): Promise<SystemApp[]>;
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
