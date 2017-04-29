/// <reference path="../../shared.d.ts"/>

import * as React from "react";
import {ipcRenderer} from "electron";
import {RouteComponentProps} from "react-router-dom";
import {Segment,Header,Icon,Message} from "semantic-ui-react";

import {mainEvents,rendererEvents} from "../../events";
import {InstalledAppsTable} from "./InstalledAppsTable";

export interface InstalledAppsProps extends RouteComponentProps<InstalledAppsProps>
{
}

export interface InstalledAppsState
{
    apps: InstalledApp[];
}

export class InstalledApps extends React.Component<InstalledAppsProps, InstalledAppsState>
{
    private eventListeners = new Map<string, Electron.IpcRendererEventListener>();

    private appsLoading = true;

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
        return <div className="content">
                 <Header as="h1" dividing><Icon name="desktop"/> Installed Apps</Header>
                 <Segment basic loading={this.appsLoading}>                 
                   {this.state.apps.length === 0
                      ? <Message>No installed apps found.</Message>
                      : <InstalledAppsTable apps={this.state.apps}/>}
                  </Segment>
                </div>;
    }

    private registerEventListener(channel: string, eventListener: Electron.IpcRendererEventListener): void
    {
        this.eventListeners.set(channel, eventListener);
        ipcRenderer.on(channel, eventListener);
    }

    private handleAppsLoaded(apps: InstalledApp[]): void
    {
        this.appsLoading = false;
        this.setState({ apps: apps });
    }

    private handleVersionInfoLoaded(app: InstalledApp): void
    {
        this.setState(prevState => ({ apps: this.updateAppInState(app, prevState) }));
    }

    private updateAppInState(app: InstalledApp, state: InstalledAppsState): InstalledApp[]
    {
        const appIndex = state.apps.findIndex(_ => _.id === app.id);
        state.apps[appIndex] = app;
        return state.apps;
    }
}
