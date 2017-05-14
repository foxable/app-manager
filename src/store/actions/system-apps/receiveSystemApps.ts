export default function receiveSystemApps(apps: SystemApp[]): ReceiveSystemAppsAction
{
    return { type: "RECEIVE_SYSTEM_APPS", payload: { apps } };
}