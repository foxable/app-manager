import {Dispatch} from "redux";
import {connect} from "react-redux";

import {requestInstalledApps,requestLatestVersion} from "../../store";
import {InstalledApps,InstalledAppsProps} from "./InstalledApps";

function mapStateToProps(state: AppState)
{
    return state.installedApps;
}

function mapStateToDispatch(dispatch: Dispatch<AppState>)
{
    return {
        onReady: () => dispatch(requestInstalledApps()),
        onRefreshLatestVersion: (appId: string) => dispatch(requestLatestVersion(appId))
    };
}

export default connect<InstalledAppsState, {}, InstalledAppsProps>(mapStateToProps, mapStateToDispatch)(InstalledApps);