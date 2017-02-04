import * as React from "react";
import * as classNames from "classnames";

export interface IconProps
{
    name: string;
}

export class Icon extends React.Component<IconProps, undefined>
{
    public render(): JSX.Element
    {
        const iconClass = classNames("fa", `fa-${this.props.name}`);

        return <i className={iconClass} aria-hidden="true"></i>;
    }
}
