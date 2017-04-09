import * as React from "react";
import * as classnames from "classnames";

export interface TabGroupProps
{
    className?: string;
}

export class TabGroup extends React.Component<TabGroupProps, undefined>
{
    public render(): JSX.Element
    {
        return <ul className={classnames("tabs", this.props.className)}>
                 {this.props.children}
               </ul>;
    }
}
