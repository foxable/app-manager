import * as React from "react";

export interface PageProps
{
    title: string;
}

export class Page extends React.Component<PageProps, undefined>
{
    public render(): JSX.Element
    {
        return <div className="container-fluid">
                 <h1>{this.props.title}</h1>
                 {this.props.children}
               </div>;
    }
}
