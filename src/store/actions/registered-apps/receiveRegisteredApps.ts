export default function receiveRegisteredApps(apps: RegisteredApp[]): ReceiveRegisteredAppsAction
{
    return { type: "RECEIVE_REGISTERED_APPS", payload: { apps } };
}