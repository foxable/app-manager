/// <reference path="./main.d.ts"/>

import * as url from "url";
import * as path from "path";
import {BrowserWindow,ipcMain} from "electron";

import Events from "../events";
import AppRegistry from "./registry/AppRegistry";
import {WindowsAppProvider} from "./system/WindowsAppProvider";
import {VersionProviderFactory} from "./version-provider/VersionProviderFactory";
import VersionComparer from "./VersionComparer";
import Utils from "./Utils";

export default class Main
{
    public static mainWindow: Electron.BrowserWindow;
    private static app: Electron.App;
    public static BrowserWindow: typeof BrowserWindow;

    private static appRegistry: AppRegistry;
    private static systemAppProvider: SystemAppProvider;

    public static main(app: Electron.App, browserWindow: typeof BrowserWindow)
    {
        Main.BrowserWindow = browserWindow;
        Main.app = app;        
        // init registry
        const appsPath = path.join(Main.app.getAppPath(), "storage", "apps");
        Main.appRegistry = new AppRegistry(appsPath);
        // init system app provider
        Main.systemAppProvider = new WindowsAppProvider();

        // This method will be called when Electron has finished
        // initialization and is ready to create browser windows.
        // Some APIs can only be used after this event occurs.
        Main.app.on("ready", Main.onReady);
        // Quit when all windows are closed.
        Main.app.on("window-all-closed", Main.onWindowAllClosed);
        Main.app.on("activate", Main.onActivate);
        // register renderer messages
        ipcMain.on(Events.FETCH_INSTALLED_APPS, Main.onLoadInstalledApps);
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

    private static onLoadInstalledApps(event: Electron.IpcMainEvent): void
    {
        Promise.all([Main.systemAppProvider.loadApps(false), Main.appRegistry.loadApps(false)])
            .then(([systemApps, registeredApps]) =>
            {
                const installedApps = Utils
                    .joinBy(systemApps, registeredApps, (s, r) => Utils.contains(s.name, r.name))
                    .map(app => Main.initApp(app));

                event.sender.send(Events.INSTALLED_APPS_FETCHED, <InstalledAppsFetchedParam>installedApps);
                // lazily load latest version
                installedApps.forEach(app => Main.loadLatestVersion(event, app));  
            });
    }

    private static initApp(app: SystemApp & RegisteredApp): InstalledApp
    {
        return { ...app, latestVersion: null, isOutdated: false };
    }

    private static loadLatestVersion(event: Electron.IpcMainEvent, app: InstalledApp): void
    {
        const versionProvider = Main.appRegistry.loadVersionProvider(app.id);
        VersionProviderFactory.create(versionProvider).getVersion().then(latestVersion =>
        {
            const isOutdated = new VersionComparer(app.installedVersion).isLesserThan(latestVersion);
            event.sender.send(Events.LATEST_VERSION_FETCHED, <LatestVersionFetchedParam>{ id: app.id, latestVersion, isOutdated });
        });            
    }
}
