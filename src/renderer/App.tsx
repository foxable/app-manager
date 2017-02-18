import * as React from "react";
import {Link} from "react-router";

export class App extends React.Component<undefined, undefined>
{
    public render(): JSX.Element
    {
        return <div className="container-fluid">
                 <ul className="nav">
                   <li className="nav-item">
                     <Link to="/apps" className="nav-link">App List</Link>
                   </li>
                   <li className="nav-item">
                     <Link to="/app-registry" className="nav-link">App Registry</Link>
                   </li>
                 </ul>
                 {this.props.children}
               </div>;
    }
}
