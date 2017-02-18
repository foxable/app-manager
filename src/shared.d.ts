declare interface App
{
    readonly id: string;
    readonly name: string;
    readonly websiteUrl: string;
    readonly downloadUrl: string;
}

declare interface SystemApp
{
    name: string;
    version: string;
    publisher: string;
    installDate: string;
}
