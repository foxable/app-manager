import * as path from "path";
import {app} from "electron";

import {App,VersionProvider} from "../../models";
import {Store} from "./Store";

export class AppStore
{
    public static loadApps(): Promise<App[]>
    {
        return Store.readJsonFiles<App>(AppStore.getAppsPath(), AppStore.loadApp);
    }

    public static loadApp(appId: string): Promise<App>
    {
        return Store.readJsonFile<App>(AppStore.getAppPath("app.json", appId));
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
