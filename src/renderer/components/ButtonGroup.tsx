import * as React from "react";
import * as classNames from "classnames";

import {ButtonSize} from "./Button";

export interface ButtonGroupProps
{
    size?: ButtonSize;
    vertical?: boolean;
}

export class ButtonGroup extends React.Component<ButtonGroupProps, undefined>
{
    public render(): JSX.Element
    {
        return <div className={this.class} role="group">
                 {this.props.children}
               </div>;
    }

    private get class(): string
    {
        const size = this.props.size || "md";

        return classNames(
            "btn-group",
            { [`btn-${this.props.size}`]: size !== "md" },
            { "btn-group-vertical": this.props.vertical }
        );
    }
}
