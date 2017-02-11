import {VersionProvider} from "../../models";
import {HtmlVersionProviderWrapper} from "./HtmlVersionProviderWrapper";

export interface VersionProviderWrapper
{
    getVersion(): Promise<string>;
}

export class VersionProviderFactory
{
    public static create(versionProvider: VersionProvider): VersionProviderWrapper
    {
        if (versionProvider.type === "html")
            return new HtmlVersionProviderWrapper(versionProvider);
    }
}
