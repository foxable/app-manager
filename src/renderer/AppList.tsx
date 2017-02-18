/// <reference path="../shared.d.ts"/>

import * as React from "react";
import {ipcRenderer} from "electron";

import {mainEvents,rendererEvents} from "../events";
import {Page,Table,TableColumn,TableRow} from "./components";

export interface AppListState
{
    apps: SystemApp[];
}

export class AppList extends React.Component<undefined, AppListState>
{
    private columns: TableColumn[] = [
        { id: "name", label: "Name" },
        { id: "version", label: "Version" },
        { id: "publisher", label: "Publisher" },
        { id: "installDate", label: "Install Date" }
    ];

    public constructor()
    {
        super();
        this.state = { apps: [] };

        ipcRenderer.on(rendererEvents.systemAppsLoaded, (event, apps) => this.onSystemAppsLoaded(apps));
    }

    public componentDidMount(): void
    {
        ipcRenderer.send(mainEvents.loadSystemApps);
    }

    public render(): JSX.Element
    {
        return <Page title="Applications">
                 <Table columns={this.columns} rows={this.rows}/>
               </Page>;
    }

    private get rows(): TableRow[]
    {
        return this.state.apps.map(app => ({
            id: app.name.toLowerCase(),
            cells: [app.name, app.version, app.publisher, app.installDate]
        }));
    }

    private onSystemAppsLoaded(apps: SystemApp[]): void
    {
        this.setState({ apps: apps });
    }
}
