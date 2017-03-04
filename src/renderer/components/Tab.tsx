import * as React from "react";

export class Tab extends React.Component<undefined, undefined>
{
    public render(): JSX.Element
    {
        return <li className="tab">
                 {this.props.children}
               </li>;
    }
}
