import * as path from "path";
import {spawn} from "child_process";
import {app} from "electron";

import {parseJson} from "../utils/fileSystem";

export default class WindowsAppProvider implements SystemAppProvider
{
    public async loadApps(): Promise<SystemApp[]>
    {
        return new Promise<SystemApp[]>((resolve, reject) =>
        {
            const psScript = path.join(app.getAppPath(), "scripts", "readSystemApps.ps1");
            // run ps command
            const child = spawn("PowerShell.exe", ["-ExecutionPolicy", "RemoteSigned", "-File", psScript]);
            let result = "";

            child.stdout.on("data", data => result += data.toString());
            child.stderr.on("data", data => reject(`Error while loading system apps: ${data}`));
            child.on("exit", () => resolve(parseJson<SystemApp[]>(result)));
            child.stdin.end();
        });
    }
}
