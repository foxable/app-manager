import * as http from "http";
import * as https from "https";
import * as cheerio from "cheerio";
import {Promise} from "core-js";

import {HtmlVersionProvider} from "../../models";
import {VersionProviderAdapter} from "./VersionProviderFactory";

export class HtmlVersionProviderAdapter implements VersionProviderAdapter
{
    public constructor(private readonly versionProvider: HtmlVersionProvider)
    {
    }

    public getVersion(): Promise<string>
    {
        return this.getHtmlContent(this.versionProvider.url)
            .then(htmlContent => this.versionProvider.getVersion(cheerio.load(htmlContent)));
    }

    public getHtmlContent(url: string): Promise<string>
    {
        return new Promise<string>((resolve, reject) =>
        {
            const isHttps = url.indexOf("https://") === 0;

            if (isHttps)
                https.get(url, res => resolve(this.processResponse(res)));
            else
                http.get(url, res => resolve(this.processResponse(res)));
        });
    }

    private processResponse(res: http.IncomingMessage): Promise<string>
    {
        return new Promise<string>((resolve, reject) =>
        {
            const statusCode = res.statusCode;
            const contentType = res.headers["content-type"];

            let error: Error;
            if (statusCode !== 200)
                error = new Error(`Request failed. Status Code: ${statusCode}.`);
            else if (!/^text\/html/.test(contentType))
                error = new Error(`Invalid content-type. Expected text/html but received ${contentType}`);

            if (error)
            {
                res.resume();
                reject(error.message);
            }

            res.setEncoding("utf8");
            let rawData = "";
            res.on("data", (chunk) => rawData += chunk);
            res.on('end', () => resolve(rawData));
        });
    }
}
