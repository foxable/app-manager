import * as http from "http";
import * as https from "https";
import * as cheerio from "cheerio";
import {Promise} from "core-js";

import {HtmlVersionProvider} from "../../models";
import {VersionProviderWrapper} from "./VersionProviderFactory";

export class HtmlVersionProviderWrapper implements VersionProviderWrapper
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
            const isHttps = url.indexOf("https://") > -1;

            if (isHttps)
            {
                https.get(url, res =>
                {
                    const statusCode = res.statusCode;
                    const contentType = res.headers["content-type"];

                    if (statusCode !== 200)
                    {
                        reject(`Request failed. Status Code: ${statusCode}.`);
                        res.resume();
                    }
                    else if (!/^text\/html/.test(contentType))
                    {
                        reject(`Invalid content-type. Expected text/html but received ${contentType}`);
                        res.resume();
                    }

                    res.setEncoding("utf8");
                    let rawData = "";
                    res.on("data", (chunk) => rawData += chunk);
                    res.on('end', () => resolve(rawData));
                });
            }
            else
            {
                http.get(url, res =>
                {
                    const statusCode = res.statusCode;
                    const contentType = res.headers["content-type"];

                    if (statusCode !== 200)
                    {
                        reject(`Request failed. Status Code: ${statusCode}.`);
                        res.resume();
                    }
                    else if (!/^text\/html/.test(contentType))
                    {
                        reject(`Invalid content-type. Expected text/html but received ${contentType}`);
                        res.resume();
                    }

                    res.setEncoding("utf8");
                    let rawData = "";
                    res.on("data", (chunk) => rawData += chunk);
                    res.on('end', () => resolve(rawData));
                });
            }
        });
    }
}
