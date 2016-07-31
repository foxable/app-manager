import { Component, OnInit, ComponentResolver, ComponentFactory, ViewContainerRef, ViewChild, ComponentRef } from '@angular/core';

import { App } from './app';
import { AppService } from './app.service';
import { AppModalComponent } from './app-modal.component';

@Component({
  selector: 'all-apps',
  templateUrl: './all-apps.html',
  providers: [AppService]
})
export class AllAppsComponent implements OnInit
{
    private modal: Promise<ComponentRef<AppModalComponent>>;
    
    @ViewChild('appModal', { read: ViewContainerRef }) private appModalContainer: ViewContainerRef;
    
    public apps: App[] = [];
    
    public constructor (
        private resolver: ComponentResolver,
        private appService: AppService) { }
    
    public ngOnInit(): void
    {
        this.getApps();
    }
    
    private getApps(): void
    {
        this.appService.getAllApps().then(apps => this.apps = apps);
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
                        this.getApps();
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
    
    public showCreateAppModal(): void
    {
        this.openModal()
            .then(componentRef => {
                componentRef.instance.title = 'Add Application';
            });
    }
    
    public showEditAppModal(appId: number): void
    {
        this.openModal()
            .then(componentRef => {
                componentRef.instance.title = 'Edit Application';
                this.appService.getApp(appId).then(app => {
                    componentRef.instance.app = app;
                });
            });
    }
    
    public hideModal(): void
    {
        this.closeModal();
    }
}