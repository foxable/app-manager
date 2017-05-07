import * as path from "path";
import * as program from "commander";
import AppRegistry from "../main/registry/AppRegistry";
import VersionProviderFactory from "../main/version-provider/VersionProviderFactory";

const appRegistry = new AppRegistry(path.join(__dirname, "..", "..", "..", "storage", "apps"));

function toTimeDiff(tStart: [number, number]): string
{
    let seconds: number, nanos: number;
    [seconds, nanos] = process.hrtime(tStart);
    const millis = seconds * 1e3 + Math.floor(nanos / 1e6);

    return `${millis} ms`;
}

function getLatestVersion(appId: string): void
{
    const tStart = process.hrtime();
    const versionProvider = appRegistry.loadVersionProvider(appId);    
    
    VersionProviderFactory.create(versionProvider).getVersion()
        .then(version => console.log(`${version} | ${toTimeDiff(tStart)}`))
        .catch(reason => console.log(`Error: ${reason}`))
}

program
    .version("0.0.1");

program
    .command("latest-version <appId>")
    .action((appId, options) => getLatestVersion(appId));

program.parse(process.argv);