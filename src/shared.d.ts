declare interface RegisteredApp
{
    readonly id: string;
    readonly name: string;
    readonly websiteUrl: string;
    readonly downloadUrl: string;
}

declare interface InstalledApp
{
    readonly name: string;
    readonly version: string;
    readonly publisher: string;
    readonly installDate: string;
}
