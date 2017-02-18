import * as React from "react";
import * as classNames from "classnames";
import {Link} from "react-router";

export interface NavLinkProps
{
    to: string;
}

export class NavLink extends React.Component<NavLinkProps, undefined>
{
    public static contextTypes = {
        router: React.PropTypes.func.isRequired
    };

    public render(): JSX.Element
    {
        return <li className={this.class}>
                 <Link to={this.props.to} className="nav-link">{this.props.children}</Link>
               </li>;
    }

    private get class(): string
    {
        return classNames(
            "nav-item",
            { "active": this.context.router.isActive(this.props.to) }
        );
    }
}
