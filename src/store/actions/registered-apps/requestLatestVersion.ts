export default function requestLatestVersion(appId: string): RequestLatestVersionAction
{
    return { type: "REQUEST_LATEST_VERSION", payload: { appId } };
}