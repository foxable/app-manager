/// <reference path="../main.d.ts"/>
/// <reference path="../../shared.d.ts"/>

import * as path from "path";
import {spawn} from "child_process";
import {app} from "electron";
import {Promise} from "core-js";

import Utils from "../Utils";

export class WindowsAppProvider implements SystemAppProvider
{
    private systemApps: Promise<SystemApp[]> = null;

    public loadApps(forceReload: boolean): Promise<SystemApp[]>
    {
        if (this.systemApps == null || forceReload)
        {
            this.systemApps = this.reloadApps();
        }

        return this.systemApps;
    }

    private reloadApps(): Promise<SystemApp[]>
    {
        return new Promise<SystemApp[]>((resolve, reject) =>
        {
            const psScript = path.join(app.getAppPath(), "scripts", "readSystemApps.ps1");
            // run ps command
            const child = spawn("PowerShell.exe", ["-ExecutionPolicy", "RemoteSigned", "-File", psScript]);
            let result = "";

            child.stdout.on("data", data => result += data.toString());
            child.stderr.on("data", data => reject(`Error while loading system apps: ${data}`));
            child.on("exit", () => resolve(Utils.parseJson<SystemApp[]>(result)));
            child.stdin.end();
        });
    }
}
