import {Component, ViewChild, OnInit, AfterViewInit, Output, EventEmitter, ComponentResolver, ComponentFactory, ViewContainerRef } from '@angular/core';

import {BS_VIEW_PROVIDERS, MODAL_DIRECTIVES, TAB_DIRECTIVES, ModalDirective} from 'ng2-bootstrap/ng2-bootstrap'; 

import {App} from './app';
import {AppService} from './app.service';
import {VERSION_PROVIDERS, VersionProvider, VersionProviderComponent} from '../version-providers';
 
@Component({
  selector: 'app-modal',
  directives: [MODAL_DIRECTIVES, TAB_DIRECTIVES],
  viewProviders: [BS_VIEW_PROVIDERS],
  templateUrl: './app-modal.html'
})
export class AppModalComponent implements OnInit, AfterViewInit
{
    @ViewChild('modal') private modal: ModalDirective;
    @ViewChild('versionProvider', { read: ViewContainerRef }) private versionProviderContainer: ViewContainerRef;
    
    @Output() public onReady: EventEmitter<any> = new EventEmitter<any>();
    @Output() public onSaved: EventEmitter<any> = new EventEmitter<any>();
    @Output() public onClosed: EventEmitter<any> = new EventEmitter<any>();
    
    public versionProviderTypes = VERSION_PROVIDERS;
    
    public title: string;
    public app: App;
    public versionProviders: { [type: string]: VersionProvider; };    
    public errors: { field: string; errors: string[]; }[];
    
    public constructor(
        private resolver: ComponentResolver,
        private appService: AppService
    ) { }
    
    public ngOnInit(): void
    {
        this.title = '';
        this.app = new App();
        this.versionProviders = {};
        this.errors = [];
    }
    
    public ngAfterViewInit(): void
    {
        this.onReady.emit(null);
    }
    
    public show(): void
    {        
        this.modal.show();
    }
    
    public hide(): void
    {
        this.modal.hide();
        this.onClosed.emit(null);
    }
    
    public setTitle(title: string): void
    {
        this.title = title;
    }
    
    public setApp(app: App): void
    {
        this.app = app;
        this.versionProviders[app.versionProviderType] = app.versionProvider;
        this.versionProviderTypeChanged(app.versionProviderType);
    }
    
    public versionProviderTypeChanged(newType: string): void
    {
        if (this.versionProviderContainer.length > 0)
            this.versionProviderContainer.remove();
        
        const versionProviderType = VERSION_PROVIDERS.find(_ => _.id === newType);
        let versionProvider: VersionProvider;
        
        // use previous version provider
        if (this.versionProviders[newType])
        {
            versionProvider = this.versionProviders[newType];
        }
        // create empty version provider
        else
        {
            versionProvider = versionProviderType.createModel();
            this.versionProviders[newType] = versionProvider;
        }
        this.app.versionProvider = versionProvider;
        
        // create version provider component
        this.resolver
            .resolveComponent(versionProviderType.componentType)
            .then((factory: ComponentFactory<VersionProviderComponent>) => {
                const componentRef = this.versionProviderContainer.createComponent(factory, 0, this.versionProviderContainer.injector);

                componentRef.instance.versionProvider = this.app.versionProvider;
            });
    }

    public save(): void
    {
        this.appService.saveApp(this.app)
            .then(() => {
                this.hide();
                this.onSaved.emit(null);
            })
            .catch((error: any) => {
                if (error._body)
                {
                    const errors: { [field: string]: string[]; } = JSON.parse(error._body);
                    
                    this.errors = Object.keys(errors).map(field => {
                       return {
                           field: field,
                           errors: errors[field]
                       };
                    });
                }
        });
    }
    
    public cancel(): void
    {
        this.hide();
    }
}