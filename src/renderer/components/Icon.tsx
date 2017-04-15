import * as React from "react";
import * as classnames from "classnames";

export type IconAlignment = "left" | "right";

export interface IconProps
{
    name: string;
}

export class Icon extends React.Component<IconProps, undefined>
{
    public render(): JSX.Element
    {        
        return <i className={classnames("material-icons", "icon")}>{this.props.name}</i>;
    }
}
