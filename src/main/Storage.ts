import * as path from "path";
import * as fs from "fs";
import {app} from "electron";
import {Promise} from "core-js";

import {App} from "../Models";

export class Storage
{
    public static paths = {
        apps: "apps"
    };

    public static getApps(): Promise<App[]>
    {
        return new Promise<App[]>((resolve, reject) =>
        {
            fs.readdir(Storage.getAppsPath(), (err, files) =>
            {
                let promiseChain = new Promise<App[]>(resolve => resolve([]));

                if (err)
                {
                    reject(err.message);
                    return;
                }

                files.forEach(appFile =>
                {
                    promiseChain = promiseChain.then(apps =>
                    {
                        return Storage.getApp(appFile).then(app =>
                        {
                            apps.push(app);
                            return apps;
                        });
                    });
                });

                resolve(promiseChain);
            });
        });
    }

    public static getApp(appFile: string): Promise<App>
    {
        return new Promise<App>((resolve, reject) =>
        {
            fs.readFile(path.join(Storage.getAppsPath(), appFile), (err, data) =>
            {
                if (err)
                {
                    reject(err.message);
                    return;
                }

                resolve(Storage.parseAsJson<App>(data));
            });
        });
    }

    private static parseAsJson<T>(file: Buffer): T
    {
        return JSON.parse(file.toString());
    }

    private static getAppsPath(): string
    {
        return path.join(app.getAppPath(), Storage.paths.apps);
    }
}
