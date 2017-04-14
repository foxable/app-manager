import * as React from "react";
import {Switch,Route,Redirect,NavLink} from "react-router-dom";

import {TabGroup,Tab} from "./components";
import {AppList} from "./AppList";
import {AppRegistry} from "./AppRegistry";

export class App extends React.Component<undefined, undefined>
{
    public render(): JSX.Element
    {
        return <div>
                 <TabGroup className="light-blue darken-4 z-depth-1">
                    <Tab><NavLink to="/installed-apps" activeClassName="active">Installed Apps</NavLink></Tab>
                    <Tab><NavLink to="/registered-apps" activeClassName="active">Registered Apps</NavLink></Tab>
                 </TabGroup>
                 <Switch>   
                    <Route path="/installed-apps" component={AppList}/>
                    <Route path="/registered-apps" component={AppRegistry}/>
                    <Redirect to="/installed-apps"/>    
                 </Switch>  
               </div>;
    }
}
