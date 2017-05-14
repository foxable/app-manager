export default function receiveInstalledApps(apps: (RegisteredApp & SystemApp)[]): ReceiveInstalledAppsAction
{
    return { type: "RECEIVE_INSTALLED_APPS", payload: { apps } };
}