import * as React from "react";
import {shell,ipcRenderer} from "electron";

import {MainEvents,RendererEvents} from "../events";
import {App} from "../models";
import {Page,Button,ButtonGroup,Table,TableColumn,TableRow} from "./components";

export interface AppRegistryState
{
    apps: App[];
}

export class AppRegistry extends React.Component<undefined, AppRegistryState>
{
    private columns: TableColumn[] = [
        { id: "name", label: "Name" },
        { id: "actions", label: "Actions"}
    ];

    public constructor()
    {
        super();
        this.state = { apps: [] };

        ipcRenderer.on(RendererEvents.appsLoaded, (event, apps) => this.onAppsLoaded(apps))
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
            cells: [app.name, this.rowActions(app)]
        }));
    }

    private rowActions(app: App): JSX.Element
    {
        return <ButtonGroup>
                 <Button label="Download" icon="download" onClick={() => shell.openExternal(app.downloadUrl)}/>
                 <Button label="Website" icon="globe" onClick={() => shell.openExternal(app.websiteUrl)}/>
               </ButtonGroup>;
    }

    private onAppsLoaded(apps: App[]): void
    {
        this.setState({ apps: apps });
    }
}
