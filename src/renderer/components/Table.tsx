import * as React from "react";

export interface TableColumn
{
    id: string;
    label: string | JSX.Element;
}

export interface TableRow
{
    id: string;
    cells: (string | JSX.Element)[];
}

export interface TableProps
{
    columns: TableColumn[];
    rows: TableRow[];
}

export class Table extends React.Component<TableProps, undefined>
{
    public render(): JSX.Element
    {
        return <table className="highlight">
                 <thead>
                   <tr>
                     {this.props.columns.map(column => <th key={column.id}>{column.label}</th>)}
                   </tr>
                 </thead>
                 <tbody>
                   {this.props.rows.map(row =>
                       <tr key={row.id}>
                         {this.props.columns.map((column, i) => <td key={column.id}>{row.cells[i]}</td>)}
                       </tr>)
                   }
                 </tbody>
               </table>;
    }
}
