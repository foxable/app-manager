import * as React from "react";
import * as classNames from "classnames";

import {Icon} from "./Icon";

export interface ButtonProps
{
    label: string;
    style?: string;
    icon?: string;
    onClick: () => void;
}

export class Button extends React.Component<ButtonProps, undefined>
{
    public render(): JSX.Element
    {
        const btnStyle = this.props.style || "secondary";
        const btnClass = classNames("btn", `btn-${btnStyle}`);

        return <button onClick={() => this.props.onClick()} className={btnClass}>
                 {this.props.icon !== undefined &&
                     <Icon name={this.props.icon} aria-hidden="true"/>
                 }
                 {this.props.label}
                </button>;
    }
}
