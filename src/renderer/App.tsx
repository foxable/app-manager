import * as React from "react";
import {Link} from "react-router";

import {TabGroup,Tab} from "./components";

export class App extends React.Component<undefined, undefined>
{
    public render(): JSX.Element
    {
        return <div>
                <TabGroup className="light-blue darken-4 z-depth-1">
                    <Tab><Link to="/installed-apps" activeClassName="active">Installed Apps</Link></Tab>
                    <Tab><Link to="/registered-apps" activeClassName="active">Registered Apps</Link></Tab>
                 </TabGroup>
                 {this.props.children}
               </div>;
    }
}
