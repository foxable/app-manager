export interface App
{
    readonly id: string;
    readonly name: string;
    readonly websiteUrl: string;
    readonly downloadUrl: string;
}

export type VersionProvider = HtmlVersionProvider;

export interface HtmlVersionProvider
{
    type: "html";
    url: string;
    getVersion($: CheerioStatic): string;
}
