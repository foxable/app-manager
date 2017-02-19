/// <reference path="../shared.d.ts"/>

import * as React from "react";
import {shell,ipcRenderer} from "electron";

import {mainEvents,rendererEvents} from "../events";
import {Page,Table,TableColumn,TableRow,Icon,Button,ButtonGroup} from "./components";

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
        return <Page title="Installed Apps">
                 <Table columns={this.columns} rows={this.rows}/>
               </Page>;
    }

    private get rows(): TableRow[]
    {
        return this.state.apps.map(app => ({
            id: app.name.toLowerCase(),
            cells: [app.name, app.version, this.rowActions(app)]
        }));
    }

    private rowActions(app: InstalledApp): JSX.Element
    {
        return <ButtonGroup>
                 <Button onClick={() => shell.openExternal("http://example.org")}><Icon name="download"/></Button>
                 <Button onClick={() => shell.openExternal("http://example.org")}><Icon name="globe"/></Button>
               </ButtonGroup>;
    }

    private onAppsLoaded(apps: InstalledApp[]): void
    {
        this.setState({ apps: apps });
    }
}
