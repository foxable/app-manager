import * as React from "react";
import * as classNames from "classnames";

export interface NavBarProps
{
    label: string;
    color: "light" | "inverse";
    fixed?: "top" | "bottom";
}

export class NavBar extends React.Component<NavBarProps, undefined>
{
    public render(): JSX.Element
    {
        return <nav className={this.class}>
                 <span className="navbar-brand">{this.props.label}</span>
                 <div className="collapse navbar-collapse">
                   <ul className="navbar-nav mr-auto">
                     {this.props.children}
                   </ul>
                 </div>
               </nav>;
    }

    private get class(): string
    {
        return classNames(
            "navbar",
            "navbar-toggleable",
            `navbar-${this.props.color}`,
            { "bg-inverse": this.props.color === "inverse" },
            { [`fixed-${this.props.fixed}`]: !!this.props.fixed }
        );
    }
}
