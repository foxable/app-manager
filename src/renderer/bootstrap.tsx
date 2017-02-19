import * as React from "react";
import * as ReactDOM from "react-dom";
import {Router,Route,IndexRedirect,hashHistory} from "react-router";

import {App} from "./App";
import {AppList} from "./AppList";
import {AppRegistry} from "./AppRegistry";

ReactDOM.render(
    <Router history={hashHistory}>
      <Route path="/" component={App}>
        <IndexRedirect to="/installed-apps"/>
        <Route path="/installed-apps" component={AppList}/>
        <Route path="/registered-apps" component={AppRegistry}/>
      </Route>
    </Router>,
    document.getElementById("app-manager-root")
);
