export default function receiveLatestVersion(appId: string, latestVersion: string, isOutdated: boolean): ReceiveLatestVersionAction
{
    return { type: "RECEIVE_LATEST_VERSION", payload: { appId, latestVersion, isOutdated } };
}