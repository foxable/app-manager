/// <reference path="../../shared.d.ts"/>

import {ipcRenderer} from "electron";
import {Dispatch} from "redux";
import {connect} from "react-redux";

import Events from "../../events";
import {loadInstalledApps} from "../store/actionCreators";
import {InstalledApps,InstalledAppsProps} from "./InstalledApps";

function mapStateToProps(state: AppState)
{
    return state.installedApps;
}

function mapStateToDispatch(dispatch: Dispatch<AppState>)
{
    return {
        onLoadApps: () => {
            dispatch(loadInstalledApps());
            ipcRenderer.send(Events.FETCH_INSTALLED_APPS);
        }
    };
}

export default connect<AppState["installedApps"], {}, InstalledAppsProps>(mapStateToProps, mapStateToDispatch)(InstalledApps);