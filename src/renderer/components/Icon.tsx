import * as React from "react";
import * as classnames from "classnames";

export type IconAlignment = "left" | "right";

export interface IconProps
{
    name: string;
    align?: "left" | "right";
    size?: "tiny" | "small" | "medium" | "large";
}

export class Icon extends React.Component<IconProps, undefined>
{
    private static defaultSize = "small";

    public render(): JSX.Element
    {
        const size = this.props.size || Icon.defaultSize;
        return <i className={classnames("material-icons", size, this.props.align)}>{this.props.name}</i>;
    }
}
