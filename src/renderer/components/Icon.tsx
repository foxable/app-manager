import * as React from "react";
import * as classNames from "classnames";

export type IconAlignment = "left" | "right";

export interface IconProps
{
    name: string;
    align: IconAlignment;
}

export class Icon extends React.Component<IconProps, undefined>
{
    public render(): JSX.Element
    {
        return <i className={this.class} aria-hidden="true"></i>;
    }

    private get class(): string
    {
        return classNames(
            "fa",
            `fa-${this.props.name}`,
            `icon-${this.props.align}`
        );
    }
}
