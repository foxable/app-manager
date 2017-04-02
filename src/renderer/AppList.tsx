/// <reference path="../shared.d.ts"/>

import * as React from "react";
import {shell,ipcRenderer} from "electron";

import {mainEvents,rendererEvents} from "../events";
import {Table,TableColumn,TableRow,Icon,Button,ButtonGroup} from "./components";

export interface AppListState
{
    apps: InstalledApp[];
}

export class AppList extends React.Component<undefined, AppListState>
{
    private columns: TableColumn[] = [
        { id: "name", label: "Name" },
        { id: "version", label: "Version" },
        { id: "actions", label: "Actions" }
    ];

    public constructor()
    {
        super();
        this.state = { apps: [] };

        ipcRenderer.on(rendererEvents.installedAppsLoaded, (event, apps) => this.onAppsLoaded(apps));
    }

    public componentDidMount(): void
    {
        ipcRenderer.send(mainEvents.loadInstalledApps);
    }

    public render(): JSX.Element
    {
        return <Table columns={this.columns} rows={this.rows}/>;
    }

    private get rows(): TableRow[]
    {
        return this.state.apps.map(app => ({
            id: app.name.toLowerCase(),
            cells: [app.name, this.toVersionStatus(app), this.toRowActions(app)]
        }));
    }

    private toVersionStatus(app: InstalledApp): JSX.Element
    {
        return <span className={app.isOutdated ? "amber-text text-accent-4" : "green-text text-darken-4"}>
                 {app.installedVersion}              
               </span>;
    }

    private toRowActions(app: InstalledApp): JSX.Element
    {
        return <ButtonGroup>
                 <Button type="floating" className="green" onClick={() => shell.openExternal(app.downloadUrl)}><Icon name="get_app" align="left"/>Download</Button>
                 <Button type="floating" className="blue" onClick={() => shell.openExternal(app.websiteUrl)}><Icon name="home" align="left"/>Website</Button>
               </ButtonGroup>;
    }

    private onAppsLoaded(apps: InstalledApp[]): void
    {
        this.setState({ apps: apps });
    }
}
