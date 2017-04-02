/// <reference path="./main.d.ts"/>

import * as url from "url";
import * as path from "path";
import {BrowserWindow,ipcMain} from "electron";

import {mainEvents,rendererEvents} from "../events";
import {AppStore} from "./store/AppStore";
import {WindowsAppProvider} from "./system/WindowsAppProvider";
import {VersionProviderFactory} from "./version-provider/VersionProviderFactory";
import VersionComparer from "./VersionComparer";
import Utils from "./Utils";

export default class Main
{
    public static mainWindow: Electron.BrowserWindow;
    private static app: Electron.App;
    public static BrowserWindow: any;

    private static appStore: AppStore;
    private static systemAppProvider: SystemAppProvider;

    public static main(app: Electron.App, browserWindow: typeof BrowserWindow)
    {
        Main.BrowserWindow = browserWindow;
        Main.app = app;
        // init app store
        const appsPath = path.join(Main.app.getAppPath(), "storage", "apps");
        Main.appStore = new AppStore(appsPath);
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
        ipcMain.on(mainEvents.loadRegisteredApps, Main.onLoadRegisteredApps);
        ipcMain.on(mainEvents.loadInstalledApps, Main.onLoadInstalledApps);
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
        Promise.all([Main.systemAppProvider.loadApps(false), Main.appStore.loadApps(false)])
            .then(([systemApps, registeredApps]) =>
            {
                const joinedApps = Utils.joinBy(systemApps, registeredApps, (s, r) => Utils.contains(s.name, r.name));

                Promise.all(joinedApps.map(app => VersionProviderFactory.create(Main.appStore.loadVersionProvider(app.id)).getVersion()))
                    .then(latestVersions =>
                    {                        
                        const installedApps = joinedApps.map((app, i) =>
                        {
                            const latestVersion = latestVersions[i];
                            const isOutdated = new VersionComparer(app.installedVersion).isLesserThan(latestVersion);

                            return { ...app, latestVersion, isOutdated };
                        });
                        event.sender.send(rendererEvents.installedAppsLoaded, installedApps);
                    });           
            });
    }

    private static onLoadRegisteredApps(event: Electron.IpcMainEvent): void
    {
        Main.appStore.loadApps(false).then(apps => event.sender.send(rendererEvents.registeredAppsLoaded, apps));
    }
}
