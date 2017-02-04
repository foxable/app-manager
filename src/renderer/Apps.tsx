import * as React from "react";
import {ipcRenderer} from "electron";

import {App} from "../Models";
import {MainEvents,RendererEvents} from "../Events";
import {Table} from "./table/Table";

export interface AppsProps
{
}

export interface AppsState
{
    apps: App[];
}

export class Apps extends React.Component<AppsProps, AppsState>
{
    public constructor(props: AppsProps)
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
        return <div>
                 <h1>Applications</h1>
                 <Table apps={this.state.apps}/>
               </div>;
    }
}
