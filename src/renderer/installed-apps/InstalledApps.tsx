/// <reference path="../../shared.d.ts"/>

import {shell} from "electron";
import * as React from "react";

import {RouteComponentProps} from "react-router-dom";
import {Segment,Header,Table,Button,Icon,Message,Popup} from "semantic-ui-react";

export interface InstalledAppsProps extends RouteComponentProps<InstalledAppsProps>
{
    onLoadApps(): void;
    isLoading: boolean;
    apps: InstalledApp[];
}

export class InstalledApps extends React.Component<InstalledAppsProps, undefined>
{
    public componentDidMount(): void
    {
        this.props.onLoadApps();
    }

    public render(): JSX.Element
    {
        return <div className="content">
                 <Header as="h1" dividing><Icon name="desktop"/> Installed Apps</Header>
                 <Segment basic loading={this.props.isLoading}>                 
                   {this.renderApps()}
                 </Segment>
               </div>;
    }

    private renderApps(): JSX.Element
    {
        if (this.props.apps.length === 0)
            return this.renderNoAppsMessage();

        return this.renderAppsTable();
    }

    private renderAppsTable(): JSX.Element
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

    private renderNoAppsMessage(): JSX.Element
    {
        return <Message>No installed apps found.</Message>;
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