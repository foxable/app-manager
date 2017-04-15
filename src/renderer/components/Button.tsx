import * as React from "react";

export interface ButtonProps
{
    onClick: () => void;
}

export class Button extends React.Component<ButtonProps, undefined>
{
    public render(): JSX.Element
    {
        return <button onClick={() => this.handleClick()} className="btn">
                 {this.props.children}
               </button>;
    }

    private handleClick(): void
    {
        this.props.onClick();
    }
}
