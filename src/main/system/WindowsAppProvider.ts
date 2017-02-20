/// <reference path="../main.d.ts"/>
/// <reference path="../../shared.d.ts"/>

import {spawn} from "child_process";
import {Promise} from "core-js";

import * as utils from "../utils";

export class WindowsAppProvider implements SystemAppProvider
{
    private properties = [
        { name: "DisplayName", as: "name" },
        { name: "DisplayVersion", as: "version" },
        { name: "Publisher", as: "publisher" },
        { name: "InstallDate", as: "installDate" }
    ];
    private nonNullProperties = ["DisplayName"];
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
            // build ps arguments
            const args = `Get-ItemProperty HKLM:\\Software\\Wow6432Node\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\* | ${this.selectApps()} | ${this.filterApps()} | ConvertTo-Json`;
            // run ps command
            const child = spawn("powershell.exe", [args]);

            child.stdout.on("data", data => resolve(utils.parseJson<SystemApp[]>(data)));
            child.stderr.on("data", data => reject(`Error while loading system apps: ${data}`));
            //child.on("exit", () => {});
            child.stdin.end();
        });
    }

    private selectApps(): string
    {
        const aliasedProperties = this.properties
            .map(property => this.alias(property.name, property.as))
            .join(", ");
        return `Select-Object ${aliasedProperties}`;
    }

    private filterApps(): string
    {
        const filteredProperties = this.properties
            .filter(property => this.nonNullProperties.find(name => name === property.name))
            .map(property => this.notNull(property.as))
            .join(", ");
        return `Where-Object ${filteredProperties}`;
    }

    private alias(property: string, alias: string): string
    {
        return `@{name="${alias}";expression={$_.${property}}}`;
    }

    private notNull(property: string): string
    {
        return `{$_.${property} -ne $null}`;
    }
}
