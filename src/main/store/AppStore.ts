/// <reference path="../main.d.ts"/>

import * as path from "path";

import {Store} from "./Store";

export class AppStore
{
    private registeredApps: Promise<RegisteredApp[]> = null;

    public constructor(private appsPath: string)
    {
    }

    public loadApps(forceReload: boolean): Promise<RegisteredApp[]>
    {
        if (this.registeredApps == null || forceReload)
        {
            this.registeredApps = Store.readJsonFiles<AppDescription>(this.appsPath, appId => this.loadApp(appId));
        }

        return this.registeredApps;
    }

    public loadApp(appId: string): Promise<RegisteredApp>
    {
        return Store.readJsonFile<AppDescription>(this.getAppPath("app.json", appId))
            .then(app => ({ ...app, id: appId }));
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
