import * as React from "react";
import {shell} from "electron";

import {App} from "../models";
import {Page,Button,ButtonGroup,AppTable,AppColumn} from "./components";

export interface AppRegistryProps
{
    apps: App[];
}

export class AppRegistry extends React.Component<AppRegistryProps, undefined>
{
    private columns: AppColumn[] = [
        { id: "name", label: "Name" },
        { id: "actions", label: "Actions"}
    ];

    public render(): JSX.Element
    {
        return <Page title="Application Registry">
                 <AppTable columns={this.columns} rows={this.props.apps} cellContent={this.renderCell}/>
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
