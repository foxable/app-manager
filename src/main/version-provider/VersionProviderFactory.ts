/// <reference path="../main.d.ts"/>

import {HtmlVersionProviderAdapter} from "./HtmlVersionProviderAdapter";

export default class VersionProviderFactory
{
    public static create(versionProvider: VersionProvider): VersionProviderAdapter
    {
        if (versionProvider.type === "html")
            return new HtmlVersionProviderAdapter(versionProvider);
    }
}
