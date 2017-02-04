import * as React from "react";

import {App} from "../../Models";

export interface TableProps
{
    apps: App[];
}

export class Table extends React.Component<TableProps, undefined>
{
    public render(): JSX.Element
    {
        return <table className="table">
                 <thead>
                   <tr>
                     <th>Name</th>
                   </tr>
                 </thead>
                 <tbody>
                   {this.props.apps.map(app => <tr><td>{app.name}</td></tr>)}
                 </tbody>
               </table>;
    }
}
