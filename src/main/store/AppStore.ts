/// <reference path="../main.d.ts"/>

import * as path from "path";
import {app} from "electron";

import {Store} from "./Store";

export class AppStore
{
    public static loadApps(): Promise<RegisteredApp[]>
    {
        return Store.readJsonFiles<RegisteredApp>(AppStore.getAppsPath(), AppStore.loadApp);
    }

    public static loadApp(appId: string): Promise<RegisteredApp>
    {
        return Store.readJsonFile<RegisteredApp>(AppStore.getAppPath("app.json", appId));
    }

    public static loadVersionProvider(appId: string): VersionProvider
    {
        return require(AppStore.getAppPath("versionProvider.js", appId)).default;
    }

    private static getAppPath(file: string, appId: string): string
    {
        return path.join(AppStore.getAppsPath(), appId, file);
    }

    private static getAppsPath(): string
    {
        return path.join(app.getAppPath(), "storage", "apps");
    }
}
