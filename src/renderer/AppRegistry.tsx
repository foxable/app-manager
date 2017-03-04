/// <reference path="../shared.d.ts"/>

import * as React from "react";
import {ipcRenderer} from "electron";

import {mainEvents,rendererEvents} from "../events";
import {Button,ButtonGroup,Icon,Table,TableColumn,TableRow} from "./components";

interface RegisteredAppWithVersion extends RegisteredApp
{
    latestVersion: string;
}

export interface AppRegistryState
{
    apps: RegisteredAppWithVersion[];
}

export class AppRegistry extends React.Component<undefined, AppRegistryState>
{
    private columns: TableColumn[] = [
        { id: "name", label: "Name" },
        { id: "actions", label: "Actions" }
    ];

    public constructor()
    {
        super();
        this.state = { apps: [] };

        ipcRenderer.on(rendererEvents.registeredAppsLoaded, (event, apps) => this.onAppsLoaded(apps));
    }

    public componentDidMount(): void
    {
        ipcRenderer.send(mainEvents.loadRegisteredApps);
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

    private rowActions(app: RegisteredAppWithVersion): JSX.Element
    {
        return <ButtonGroup>
                 <Button type="floating" className="yellow darken-1" onClick={() => {}}><Icon name="bookmark_border" align="left"/>Bookmark</Button>
                 <Button type="floating" className="red" onClick={() => {}}><Icon name="clear" align="left"/>Remove</Button>
               </ButtonGroup>;
    }

    private onAppsLoaded(apps: RegisteredAppWithVersion[]): void
    {
        this.setState({ apps: apps.map(app => ({ ...app, latestVersion: "" })) });
    }
}
