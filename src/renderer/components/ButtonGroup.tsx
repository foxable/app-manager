import * as React from "react";

export class ButtonGroup extends React.Component<undefined, undefined>
{
    public render(): JSX.Element
    {
        return <div className="btn-group">
                 {this.props.children}
               </div>;
    }
}
