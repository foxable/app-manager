import * as React from "react";
import * as classNames from "classnames";

export type ButtonSize = "sm" | "md" | "lg";
export type ButtonStyle = "primary" | "secondary" | "success" | "info" | "warning" | "danger" | "link";
export type ButtonState = "active" | "disabled";

export interface ButtonProps
{
    state?: ButtonState;
    style?: ButtonStyle;
    size?: ButtonSize;
    outline?: boolean;
    block?: boolean;
    onClick: () => void;
}

export class Button extends React.Component<ButtonProps, undefined>
{
    public render(): JSX.Element
    {
        return <button onClick={() => this.props.onClick()} className={this.class}>
                 {this.props.children}
               </button>;
    }

    private get class(): string
    {
        const style = this.props.style || "secondary";
        const size = this.props.size || "md";

        return classNames(
            "btn",
            this.props.outline ? `btn-outline-${style}` : `btn-${style}`,
            { [`btn-${this.props.size}`]: size !== "md" },
            this.props.state,
            { "btn-block": this.props.block }
        );
    }
}
