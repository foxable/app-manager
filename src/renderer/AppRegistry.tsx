import * as React from "react";
import {ipcRenderer,shell} from "electron";

import {App} from "../models";
import {MainEvents,RendererEvents} from "../events";
import {Page,Button,ButtonGroup,AppTable,AppColumn} from "./components";

export interface AppRegistryProps
{
}

export interface AppRegistryState
{
    apps: App[];
}

export class AppRegistry extends React.Component<AppRegistryProps, AppRegistryState>
{
    private columns: AppColumn[] = [
        { id: "name", label: "Name" },
        { id: "actions", label: "Actions"}
    ];

    public constructor(props: AppRegistryProps)
    {
        super(props);
        this.state = { apps: [] };

        ipcRenderer.on(RendererEvents.appsLoaded, (event, apps: App[]) => this.setState({ apps: apps }));
    }

    public componentDidMount(): void
    {
        ipcRenderer.send(MainEvents.loadApps);
    }

    public render(): JSX.Element
    {
        return <Page title="Application Registry">
                 <AppTable columns={this.columns} rows={this.state.apps} cellContent={this.renderCell}/>
               </Page>;
    }

    private renderCell(column: AppColumn, app: App): string | JSX.Element
    {
        if (column.id === "name")
        {
            return app.name;
        }

        if (column.id === "actions")
        {
            return <ButtonGroup>
                     <Button label="Download" icon="download" onClick={() => shell.openExternal(app.downloadUrl)}/>
                     <Button label="Website" icon="globe" onClick={() => shell.openExternal(app.websiteUrl)}/>
                   </ButtonGroup>;
        }

        return null;
    }
}
