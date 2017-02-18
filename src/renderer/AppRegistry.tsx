/// <reference path="../shared.d.ts"/>

import * as React from "react";
import {shell,ipcRenderer} from "electron";

import {MainEvents,RendererEvents} from "../events";
import {Page,Button,ButtonGroup,Table,TableColumn,TableRow} from "./components";

interface RegisteredApp extends App
{
    latestVersion: string;
}

export interface AppRegistryState
{
    apps: RegisteredApp[];
}

export class AppRegistry extends React.Component<undefined, AppRegistryState>
{
    private columns: TableColumn[] = [
        { id: "name", label: "Name" },
        { id: "latestVersion", label: "Latest Version" },
        { id: "actions", label: "Actions"}
    ];

    public constructor()
    {
        super();
        this.state = { apps: [] };

        ipcRenderer.on(RendererEvents.appsLoaded, (event, apps) => this.onAppsLoaded(apps));
        ipcRenderer.on(RendererEvents.latestVersionLoaded, (event, args) => this.onLatestVersionLoaded(args.appId, args.version))
    }

    public componentDidMount(): void
    {
        ipcRenderer.send(MainEvents.loadApps);
    }

    public render(): JSX.Element
    {
        return <Page title="Application Registry">
                 <Table columns={this.columns} rows={this.rows}/>
               </Page>;
    }

    private get rows(): TableRow[]
    {
        return this.state.apps.map(app => ({
            id: app.id,
            cells: [app.name, app.latestVersion, this.rowActions(app)]
        }));
    }

    private rowActions(app: App): JSX.Element
    {
        return <ButtonGroup>
                 <Button label="Get Version" icon="download" onClick={() => ipcRenderer.send(MainEvents.loadLatestVersion, app.id)}/>
                 <Button label="Download" icon="download" onClick={() => shell.openExternal(app.downloadUrl)}/>
                 <Button label="Website" icon="globe" onClick={() => shell.openExternal(app.websiteUrl)}/>
               </ButtonGroup>;
    }

    private onAppsLoaded(apps: App[]): void
    {
        this.setState({ apps: apps.map(app => ({ ...app, latestVersion: "" })) });
    }

    private onLatestVersionLoaded(appId: string, version: string): void
    {
        this.state.apps.find(app => app.id === appId).latestVersion = version;

        this.setState({ apps: this.state.apps });
    }
}
