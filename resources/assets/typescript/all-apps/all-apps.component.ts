import {Component, OnInit, ComponentResolver, ComponentFactory, ViewContainerRef, ViewChild, ComponentRef} from '@angular/core';

import {App} from './app';
import {AppService} from './app.service';
import {AppModalComponent} from './app-modal.component';
import {VERSION_PROVIDERS} from '../version-providers';
import {ErrorsComponent} from '../common';

@Component({
  selector: 'all-apps',
  templateUrl: './all-apps.html',
  directives: [ErrorsComponent],
  providers: [AppService]
})
export class AllAppsComponent implements OnInit
{
    private modal: Promise<ComponentRef<AppModalComponent>>;
    
    @ViewChild('appModal', { read: ViewContainerRef }) private appModalContainer: ViewContainerRef;
    @ViewChild('errors') private errors: ErrorsComponent;
    
    public apps: App[] = [];
    
    public constructor (
        private resolver: ComponentResolver,
        private appService: AppService) { }
    
    public ngOnInit(): void
    {
        this.reloadApps();
    }
    
    private reloadApps(): void
    {
        this.appService.getAllApps()
            .then(apps => this.apps = apps)
            .catch(error => this.handleError(error));
    }
    
    private openModal(): Promise<ComponentRef<AppModalComponent>>
    {
        this.closeModal();
        
        this.modal = new Promise<ComponentRef<AppModalComponent>>(resolve => {
            this.resolver
                .resolveComponent(AppModalComponent)
                .then((factory: ComponentFactory<AppModalComponent>) => {
                    const componentRef = this.appModalContainer.createComponent(factory, 0, this.appModalContainer.injector);

                    componentRef.instance.onReady.subscribe(() => {                        
                        componentRef.instance.show();
                        resolve(componentRef);                        
                    });
                    
                    componentRef.instance.onSaved.subscribe(() => {
                        this.reloadApps();
                    });
                    
                    componentRef.instance.onClosed.subscribe(() => {
                        this.closeModal();
                    });
                });
        });
        
        return this.modal;  
    }
    
    private closeModal(): void
    {
        if (this.modal)
        {
            this.modal.then(componentRef => {
                componentRef.instance.hide();                
                componentRef.destroy();
                this.modal = null;
            });
        }
    }
    
    public createApp(): void
    {
        this.openModal()
            .then(componentRef => {
                const defaultVersionProvider = VERSION_PROVIDERS[0];
                const app = new App();                
                app.versionProviderType = defaultVersionProvider.id;
                app.versionProvider = defaultVersionProvider.createModel();
                
                componentRef.instance.setTitle('Add Application');
                componentRef.instance.setApp(app);
            });
    }
    
    public editApp(app: App): void
    {
        this.appService.getApp(app.id)
            .then(app => {
                this.clearErrors();
                this.openModal()
                    .then(componentRef => {
                        componentRef.instance.setTitle('Edit Application');
                        componentRef.instance.setApp(app);
                    });
            })
            .catch(error => this.handleError(error));
    }
    
    public deleteApp(app: App): void
    {
        this.appService.deleteApp(app.id)
            .then(app => {
                this.reloadApps();
            })
            .catch(error => this.handleError(error));
    }
    
    public updateVersion(app: App): void
    {
        this.appService.updateVersion(app.id)
            .then(() => {
                this.reloadApps();
            })
            .catch(error => this.handleError(error));
    }
    
    private clearErrors(): void
    {
        this.errors.clear();
    }
    
    private handleError(error: any): void
    {
        if (error['_body'])
        {
            const json = JSON.parse(error['_body']);

            if (json['error'])
                this.errors.show(json['error']['message']);
        }
        else
        {
            this.errors.show(error['statusText']);
        }
}
}