declare interface SystemAppProvider
{
    loadSystemApps(): Promise<SystemApp[]>;
}

declare type VersionProvider = HtmlVersionProvider;

declare interface HtmlVersionProvider
{
    type: "html";
    url: string;
    getVersion($: CheerioStatic): string;
}

declare interface VersionProviderAdapter
{
    getVersion(): Promise<string>;
}
