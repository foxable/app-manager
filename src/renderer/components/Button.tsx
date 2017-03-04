import * as React from "react";
import * as classnames from "classnames";

export type ButtonSize = "normal" | "large";
export type ButtonType = "raised" | "floating" | "flat";
export type ButtonState = "active" | "disabled";

export interface ButtonProps
{
    size?: ButtonSize;
    type?: ButtonType;
    state?: ButtonState;
    className?: string;
    onClick: () => void;
}

export class Button extends React.Component<ButtonProps, undefined>
{
    private static defaultSize: ButtonSize = "normal";
    private static defaultType: ButtonType = "raised";
    private static defaultState: ButtonState = "active";

    public render(): JSX.Element
    {
        const state = this.props.state || Button.defaultState;
        return <button onClick={() => this.props.onClick()} className={classnames(this.getBaseClass(), "waves-effect", "waves-light", { "disabled": state === "disabled" }, this.props.className)}>
                 {this.props.children}
               </button>;
    }

    private getBaseClass(): string
    {
        const size = this.props.size || Button.defaultSize;
        const type = this.props.type || Button.defaultType;

        let baseClass = "btn";
        if (type !== "raised") baseClass += `-${type}`;
        if (size !== "normal") baseClass += `-${size}`;

        return baseClass;
    }
}
