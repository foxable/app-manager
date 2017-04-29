import * as React from "react";
import {Switch,Route,Redirect,NavLink} from "react-router-dom";
import {Menu,Icon} from "semantic-ui-react";

import {InstalledApps} from "./InstalledApps/InstalledApps";

export class App extends React.Component<undefined, undefined>
{
    public render(): JSX.Element
    {
        return <div>
                 <Menu>
                   <NavLink to="/installed-apps" className="item" activeClassName="active"><Icon name="desktop"/> Installed Apps</NavLink>
                   <Menu.Item disabled><Icon name="browser"/> Web Apps</Menu.Item>                    
                 </Menu>                 
                 <Switch>   
                    <Route path="/installed-apps" component={InstalledApps}/>
                    <Redirect to="/installed-apps"/>    
                 </Switch>  
               </div>;
    }
}
