import * as http from "http";
import * as https from "https";
import * as cheerio from "cheerio";

import registerCheerioPlugins from "./CheerioPlugins";

export default class HtmlVersionProviderAdapter implements VersionProviderAdapter
{
    public constructor(private readonly versionProvider: HtmlVersionProvider)
    {
    }

    public getVersion(): Promise<string>
    {
        return this.getHtmlContent(this.versionProvider.url)
            .then(htmlContent => this.runVersionProvider(htmlContent));
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

    private runVersionProvider(htmlContent: string): string
    {
        return this.versionProvider.getVersion(this.load(htmlContent));
    }

    private load(htmlContent: string): CheerioStatic
    {
        const $ = cheerio.load(htmlContent);
        registerCheerioPlugins($);
        return $;
    }
}
