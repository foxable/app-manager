import {VersionProvider} from "../../models";
import {HtmlVersionProviderAdapter} from "./HtmlVersionProviderAdapter";

export interface VersionProviderAdapter
{
    getVersion(): Promise<string>;
}

export class VersionProviderFactory
{
    public static create(versionProvider: VersionProvider): VersionProviderAdapter
    {
        if (versionProvider.type === "html")
            return new HtmlVersionProviderAdapter(versionProvider);
    }
}
