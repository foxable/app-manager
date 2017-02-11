import * as url from "url";
import * as path from "path";
import {BrowserWindow,ipcMain} from "electron";

import {AppStore} from "./store/AppStore";
import {VersionProviderFactory} from "./version-provider/VersionProviderFactory";
import {MainEvents,RendererEvents} from "../Events";

export default class Main
{
    public static mainWindow: Electron.BrowserWindow;
    public static app: Electron.App;
    public static BrowserWindow: any;

    public static main(app: Electron.App, browserWindow: typeof BrowserWindow)
    {
        Main.BrowserWindow = browserWindow;
        Main.app = app;
        // This method will be called when Electron has finished
        // initialization and is ready to create browser windows.
        // Some APIs can only be used after this event occurs.
        Main.app.on("ready", Main.onReady);
        // Quit when all windows are closed.
        Main.app.on("window-all-closed", Main.onWindowAllClosed);
        Main.app.on("activate", Main.onActivate);
        // register renderer messages
        ipcMain.on(MainEvents.loadApps, Main.onLoadApps);
        ipcMain.on(MainEvents.retrieveLatestVersion, Main.onRetrieveLatestVersion);
    }

    private static onReady(): void
    {
        // Create the browser window.
        Main.mainWindow = new Main.BrowserWindow({width: 800, height: 600});
        // and load the index.html of the app.
        Main.mainWindow.loadURL(url.format({
            pathname: path.join(Main.app.getAppPath(), "static", "index.html"),
            protocol: "file:",
            slashes: true
        }));
        // Emitted when the window is closed.
        Main.mainWindow.on("closed", Main.onClose);
    }

    private static onActivate(): void
    {
        // On OS X it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (Main.mainWindow === null)
            Main.onReady();
    }

    private static onClose(): void
    {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        Main.mainWindow = null;
    }

    private static onWindowAllClosed(): void
    {
        // On OS X it is common for applications and their menu bar
        // to stay active until the user quits explicitly with Cmd + Q
        if (process.platform !== "darwin")
            Main.app.quit();
    }

    private static onLoadApps(event: Electron.IpcMainEvent): void
    {
        AppStore.loadApps().then(apps => event.sender.send(RendererEvents.appsLoaded, apps));
    }

    private static onRetrieveLatestVersion(event: Electron.IpcMainEvent, appId: string): void
    {
        const versionProvider = AppStore.loadVersionProvider(appId);
        VersionProviderFactory.create(versionProvider).getVersion().then(version => event.sender.send(RendererEvents.latestVersionRetrieved, { appId: appId, version: version }));
    }
}