import * as React from "react";

export interface ColumnDescription
{
    id: string;
    label: string;
}

export interface RowDescription
{
    id: string;
}

export interface TableProps<TColumn extends ColumnDescription, TRow extends RowDescription>
{
    columns: TColumn[];
    rows: TRow[];
    cellContent: (column: TColumn, row: TRow) => string | JSX.Element
}

export class Table<TColumn extends ColumnDescription, TRow extends RowDescription> extends React.Component<TableProps<TColumn, TRow>, undefined>
{
    public render(): JSX.Element
    {
        return <table className="table">
                 <thead className="thead-default">
                   <tr>
                     {this.props.columns.map(column => <th key={column.id}>{column.label}</th>)}
                   </tr>
                 </thead>
                 <tbody>
                   {this.props.rows.map(row =>
                       <tr key={row.id}>
                         {this.props.columns.map(column => <td key={column.id}>{this.props.cellContent(column, row)}</td>)}
                       </tr>)
                   }
                 </tbody>
               </table>;
    }
}
