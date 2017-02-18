import {SystemApp} from "../../models";

export interface SystemAppProvider
{
    loadSystemApps(): Promise<SystemApp[]>;
}
