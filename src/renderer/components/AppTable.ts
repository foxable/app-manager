import {App} from "../../Models";
import {Table} from "./Table";

export interface AppColumn
{
    id: string;
    label: string;
}

export class AppTable extends Table<AppColumn, App>
{
}
