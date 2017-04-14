/// <reference path="../shared.d.ts"/>

import * as React from "react";
import {shell,ipcRenderer} from "electron";
import {RouteComponentProps} from "react-router-dom";

import {mainEvents,rendererEvents} from "../events";
import {Table,TableColumn,TableRow,Icon,Button,ButtonGroup} from "./components";

export interface AppListProps extends RouteComponentProps<AppListProps>
{
}

export interface AppListState
{
    apps: InstalledApp[];
}

export class AppList extends React.Component<AppListProps, AppListState>
{
    private columns: TableColumn[] = [
        { id: "name", label: "Name" },
        { id: "version", label: "Version" },
        { id: "actions", label: "Actions" }
    ];

    private eventListeners = new Map<string, Electron.IpcRendererEventListener>();

    public constructor()
    {
        super();
        this.state = { apps: [] };

        this.registerEventListener(rendererEvents.installedAppsLoaded, (event, apps) => this.handleAppsLoaded(apps));
        this.registerEventListener(rendererEvents.installedAppUpdated, (event, app) => this.handleVersionInfoLoaded(app));
    }

    public componentDidMount(): void
    {
        ipcRenderer.send(mainEvents.loadInstalledApps);
    }

    public componentWillUnmount(): void
    {
        this.eventListeners.forEach((eventListener, channel) => ipcRenderer.removeListener(channel, eventListener));
        this.eventListeners.clear();
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
        const versionClass = app.latestVersion != null
            ? app.isOutdated
                ? "is-outdated"
                : "is-up-to-date"
            : "";
        return <span className={versionClass} title={app.isOutdated ? `Latest: ${app.latestVersion}` : ""}>
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

    private registerEventListener(channel: string, eventListener: Electron.IpcRendererEventListener): void
    {
        this.eventListeners.set(channel, eventListener);
        ipcRenderer.on(channel, eventListener);
    }

    private handleAppsLoaded(apps: InstalledApp[]): void
    {
        this.setState({ apps: apps });
    }

    private handleVersionInfoLoaded(app: InstalledApp): void
    {
        this.setState(prevState => ({ apps: this.updateAppInState(app, prevState) }));
    }

    private updateAppInState(app: InstalledApp, state: AppListState): InstalledApp[]
    {
        const appIndex = state.apps.findIndex(_ => _.id === app.id);
        state.apps[appIndex] = app;
        return state.apps;
    }
}
