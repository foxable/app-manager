import * as React from "react";

import {NavBar,NavLink} from "./components";

export class App extends React.Component<undefined, undefined>
{
    public render(): JSX.Element
    {
        return <div className="container-fluid">
                 <NavBar label="App Manager" color="inverse" fixed="top">
                   <NavLink to="/installed-apps">Installed Apps</NavLink>
                   <NavLink to="/registered-apps">Registered Apps</NavLink>
                 </NavBar>
                 {this.props.children}
               </div>;
    }
}
