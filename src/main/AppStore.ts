import * as path from "path";
import {app} from "electron";

import {App} from "../models";
import {JsonStore} from "./JsonStore";

export class AppStore extends JsonStore
{
    public static loadApps(): Promise<App[]>
    {
        return AppStore.readDir<App>(AppStore.appsPath);
    }

    public static loadApp(appId: string): Promise<App>
    {
        return AppStore.readFile<App>(path.join(AppStore.appsPath, `${appId}.json`));
    }

    private static get appsPath(): string
    {
        return path.join(app.getAppPath(), "apps");
    }
}
