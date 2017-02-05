import * as React from "react";
import * as ReactDOM from "react-dom";
import {ipcRenderer} from "electron";

import {MainEvents,RendererEvents} from "../events";
import {App} from "../models";
import {AppRegistry} from "./AppRegistry";

export default class Renderer
{
    private static appManagerRoot: Element;

    public static render(appManagerRoot: Element): void
    {
        Renderer.appManagerRoot = appManagerRoot;
        // register main events
        ipcRenderer.on(RendererEvents.appsLoaded, Renderer.onAppsLoaded);
        // load apps
        ipcRenderer.send(MainEvents.loadApps);
    }

    public static onAppsLoaded(event: Electron.IpcRendererEvent, apps: App[]): void
    {
        ReactDOM.render(
            <AppRegistry apps={apps}/>,
            Renderer.appManagerRoot
        );
    }
}
