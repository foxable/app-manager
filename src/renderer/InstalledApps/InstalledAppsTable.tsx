/// <reference path="../../shared.d.ts"/>

import * as React from "react";
import {shell} from "electron";
import {Table,Button,Icon,Popup} from "semantic-ui-react";

export interface InstalledAppsTableProps
{
    apps: InstalledApp[];
}

export class InstalledAppsTable extends React.Component<InstalledAppsTableProps, undefined>
{
    public render(): JSX.Element
    {
        return <Table compact basic="very">
                 <Table.Body>
                   {this.props.apps.map(app =>
                       <Table.Row key={app.id} warning={app.isOutdated}>
                         <Table.Cell>{app.name}</Table.Cell>
                         <Table.Cell textAlign="right">{app.isOutdated && this.renderOutdatedWarning(app)}{app.installedVersion}</Table.Cell>
                         <Table.Cell textAlign="right">
                           <Button basic onClick={() => this.openLink(app.downloadUrl)}><Icon name="download"/> Download</Button>
                           <Button basic onClick={() => this.openLink(app.websiteUrl)}><Icon name="world"/> Website</Button>
                         </Table.Cell>
                       </Table.Row>)
                   }
                 </Table.Body>
               </Table>;
    }

    private renderOutdatedWarning(app: InstalledApp): JSX.Element
    {
        return <Popup
                 trigger={<Icon name="attention"/> }
                 content={`Latest: ${app.latestVersion}`}
                 on="hover"
                 position="left center"
               />;
    }

    private openLink(url: string): void
    {
        shell.openExternal(url);
    }
}