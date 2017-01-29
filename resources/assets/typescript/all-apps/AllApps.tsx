import * as React from "react";

import {App} from "./App";

export interface AllAppsProps
{
    compiler: string;
    framework: string;
}

export class AllApps extends React.Component<AllAppsProps, {}>
{   
    public apps: App[] = [];
    
    public render(): JSX.Element
    {
        return <h1>Hello from {this.props.compiler} and {this.props.framework}!</h1>;
//        return <div class="container">
//    <h1>All Applications</h1>
//    <div class="alert alert-danger" *ngIf="error">
//        {{error.message}}
//    </div>
//    <button class="btn btn-sm btn-primary" (click)="createApp()">
//        <i class="fa fa-plus"></i> Add Application
//    </button>
//    <table class="table table-striped table-hover">
//        <thead>
//            <tr>
//                <th>Application</th>
//                <th>Latest Version</th>         
//                <th>Actions</th>
//            </tr>
//        </thead>
//        <tbody>
//            <tr *ngFor="let app of apps">
//                <td>{{ app.name }}</td>
//                <td>{{ app.latestVersion }}</td>
//                <td>
//                    <button class="btn btn-sm btn-warning" (click)="updateVersion(app)">
//                        <i class="fa fa-refresh" aria-hidden="true"></i> Update Version
//                    </button>
//                    <button class="btn btn-sm btn-primary" (click)="editApp(app)">
//                        <i class="fa fa-edit" aria-hidden="true"></i> Edit
//                    </button>
//                    <button class="btn btn-sm btn-danger" (click)="deleteApp(app)">
//                        <i class="fa fa-trash"></i> Delete
//                    </button>              
//                </td>
//            </tr>
//        </tbody>
//    </table>
//</div>;
    }
        
//    public ngOnInit(): void
//    {
//        this.reloadApps();
//    }
//    
//    private reloadApps(): void
//    {
//        this.appService.getAllApps()
//            .then(apps => this.apps = apps)
//            .catch(error => this.handleError(error));
//    }
    
//    private openModal(): Promise<ComponentRef<AppModalComponent>>
//    {
//        this.closeModal();
//        
//        this.modal = new Promise<ComponentRef<AppModalComponent>>(resolve => {
//            this.resolver
//                .resolveComponent(AppModalComponent)
//                .then((factory: ComponentFactory<AppModalComponent>) => {
//                    const componentRef = this.appModalContainer.createComponent(factory, 0, this.appModalContainer.injector);
//
//                    componentRef.instance.onReady.subscribe(() => {                        
//                        componentRef.instance.show();
//                        resolve(componentRef);                        
//                    });
//                    
//                    componentRef.instance.onSaved.subscribe(() => {
//                        this.reloadApps();
//                    });
//                    
//                    componentRef.instance.onClosed.subscribe(() => {
//                        this.closeModal();
//                    });
//                });
//        });
//        
//        return this.modal;  
//    }
    
//    private closeModal(): void
//    {
//        if (this.modal)
//        {
//            this.modal.then(componentRef => {
//                componentRef.instance.hide();                
//                componentRef.destroy();
//                this.modal = null;
//            });
//        }
//    }
//    
//    public createApp(): void
//    {
//        this.openModal()
//            .then(componentRef => {
//                const defaultVersionProvider = VERSION_PROVIDERS[0];
//                const app = new App();                
//                app.versionProviderType = defaultVersionProvider.id;
//                app.versionProvider = defaultVersionProvider.createModel();
//                
//                componentRef.instance.setTitle('Add Application');
//                componentRef.instance.setApp(app);
//            });
//    }
//    
//    public editApp(app: App): void
//    {
//        this.appService.getApp(app.id)
//            .then(app => {
//                this.clearErrors();
//                this.openModal()
//                    .then(componentRef => {
//                        componentRef.instance.setTitle('Edit Application');
//                        componentRef.instance.setApp(app);
//                    });
//            })
//            .catch(error => this.handleError(error));
//    }
//    
//    public deleteApp(app: App): void
//    {
//        this.appService.deleteApp(app.id)
//            .then(app => {
//                this.reloadApps();
//            })
//            .catch(error => this.handleError(error));
//    }
//    
//    public updateVersion(app: App): void
//    {
//        this.appService.updateVersion(app.id)
//            .then(() => {
//                this.reloadApps();
//            })
//            .catch(error => this.handleError(error));
//    }
//    
//    private clearErrors(): void
//    {
//        this.errors.clear();
//    }
//    
//    private handleError(error: any): void
//    {
//        if (error['_body'])
//        {
//            const json = JSON.parse(error['_body']);
//
//            if (json['error'])
//                this.errors.show(json['error']['message']);
//        }
//        else
//        {
//            this.errors.show(error['statusText']);
//        }
//    }
}