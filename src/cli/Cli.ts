import * as path from "path";
import * as program from "commander";
import {AppStore} from "../main/store/AppStore";
import {VersionProviderFactory} from "../main/version-provider/VersionProviderFactory";

const appStore = new AppStore(path.join(__dirname, "..", "..", "..", "storage", "apps"));

function getLatestVersion(appId: string): Promise<string>
{
    const versionProvider = appStore.loadVersionProvider(appId);    
    return VersionProviderFactory.create(versionProvider).getVersion();
}

program
    .version("0.0.1");

program
    .command("latest-version <appId>")
    .action((appId, options) => getLatestVersion(appId)
        .then(version => console.log(version))
        .catch(() => console.log("Unable to retrieve version for app"))
    );

program.parse(process.argv);