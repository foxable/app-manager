export function registerCheerioPlugins($: CheerioStatic): void
{
    $.prototype.contains = function (this: Cheerio, text: string): Cheerio
    {
        return this.filter((_, element) => $(element).text().indexOf(text) > -1)
    };

    $.prototype.version = function version(this: Cheerio, matchExpr: string = "@version"): string
    {
        const versionExpr = /(\d(?:\d|\.\d)*)/;   
        matchExpr = matchExpr.replace("@version", versionExpr.source);
        const match = this.text().match(new RegExp(matchExpr));
        return match && match.length > 1 ? match[1] : "Unknown";
    };
}