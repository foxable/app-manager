/// <reference path="../shared.d.ts"/>

import * as React from "react";
import {ipcRenderer} from "electron";
import {Map} from "core-js";

import {mainEvents,rendererEvents} from "../events";
import {Button,ButtonGroup,Icon,Table,TableColumn,TableRow} from "./components";

export interface AppRegistryState
{
    apps: RegisteredApp[];
}

export class AppRegistry extends React.Component<undefined, AppRegistryState>
{
    private columns: TableColumn[] = [
        { id: "name", label: "Name" },
        { id: "actions", label: "Actions" }
    ];

    private eventListeners = new Map<string, Electron.IpcRendererEventListener>();

    public constructor()
    {
        super();
        this.state = { apps: [] };
        
        this.registerEventListener(rendererEvents.registeredAppsLoaded, (event, apps) => this.handleAppsLoaded(apps));
    }

    public componentDidMount(): void
    {
        ipcRenderer.send(mainEvents.loadRegisteredApps);
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
            id: app.id,
            cells: [app.name, this.rowActions(app)]
        }));
    }

    private rowActions(app: RegisteredApp): JSX.Element
    {
        return <ButtonGroup>
                 <Button type="floating" className="yellow darken-1" onClick={() => {}}><Icon name="bookmark_border" align="left"/>Bookmark</Button>
                 <Button type="floating" className="red" onClick={() => {}}><Icon name="clear" align="left"/>Remove</Button>
               </ButtonGroup>;
    }

    private registerEventListener(channel: string, eventListener: Electron.IpcRendererEventListener): void
    {
        this.eventListeners.set(channel, eventListener);
        ipcRenderer.on(channel, eventListener);
    }

    private handleAppsLoaded(apps: RegisteredApp[]): void
    {
        this.setState({ apps: apps });
    }
}
