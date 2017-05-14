import * as path from "path";

import {readDir,readFile,parseJson} from "../utils/fileSystem";

export default class AppRegistry
{
    public constructor(private appsPath: string)
    {
    }

    public loadApps(): Promise<RegisteredApp[]>
    {
        return readDir(this.appsPath)
            .then(files => Promise.all(files.map(appId => this.loadApp(appId))));
    }

    private loadApp(appId: string): Promise<RegisteredApp>
    {
        return readFile(this.getAppPath("app.json", appId))
            .then(fileContents => parseJson<AppDescription>(fileContents))
            .then(appDescription => ({ ...appDescription, id: appId }));
    }

    public loadVersionProvider(appId: string): VersionProvider
    {
        return require(this.getAppPath("versionProvider.js", appId)).default;
    }

    private getAppPath(file: string, appId: string): string
    {
        return path.join(this.appsPath, appId, file);
    }
}
