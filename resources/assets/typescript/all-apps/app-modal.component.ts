import {Component, ViewChild, OnInit, AfterViewInit, Output, EventEmitter } from '@angular/core';

import {BS_VIEW_PROVIDERS, MODAL_DIRECTIVES, TAB_DIRECTIVES, ModalDirective} from 'ng2-bootstrap/ng2-bootstrap'; 

import {App} from './app';
import {AppService} from './app.service';
import { VersionProvider } from '../version-providers/version-provider';
import { VERSION_PROVIDERS, VERSION_PROVIDER_FACTORY } from '../version-providers/version-provider.factory';
 
@Component({
  selector: 'app-modal',
  directives: [MODAL_DIRECTIVES, TAB_DIRECTIVES],
  viewProviders: [BS_VIEW_PROVIDERS],
  templateUrl: './app-modal.html'
})
export class AppModalComponent implements OnInit, AfterViewInit
{
    @ViewChild('modal') private modal: ModalDirective;
    
    @Output() public onReady: EventEmitter<any> = new EventEmitter<any>();
    @Output() public onSaved: EventEmitter<any> = new EventEmitter<any>();
    @Output() public onClosed: EventEmitter<any> = new EventEmitter<any>();
    
    public versionProviders = VERSION_PROVIDERS;
    public versionProviderFactory = VERSION_PROVIDER_FACTORY;
    
    public title: string;
    public app: App;
    public versionProvider: VersionProvider 
    public errors: { field: string; errors: string[]; }[];
    
    public constructor (private appService: AppService) { }
    
    public ngOnInit(): void
    {
        this.title = "";
        const versionProvider = this.versionProviderFactory[this.versionProviders[0].id]();
        this.app = new App('', '', '', '', versionProvider);        
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
    
    public changeVersionProvider(newType: string): void
    {
        this.versionProvider = this.versionProviderFactory[newType]();
    }
    
    public changeLatestVersion(newVersion: string): void
    {
        this.app.latestVersion = newVersion;
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