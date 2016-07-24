import {Component, ViewChild, OnInit} from '@angular/core';

import {BS_VIEW_PROVIDERS, MODAL_DIRECTIVES, TAB_DIRECTIVES, ModalDirective} from 'ng2-bootstrap/ng2-bootstrap'; 

import {App} from './app';
import {AppService} from './app.service';
import { VersionProvider } from '../version-providers/version-provider';
import { VERSION_PROVIDERS, VersionProviderFactory } from '../version-providers/version-provider.factory';
 
@Component({
  selector: 'create-app-modal',
  directives: [MODAL_DIRECTIVES, TAB_DIRECTIVES],
  viewProviders: [BS_VIEW_PROVIDERS],
  templateUrl: './create-app.html'
})
export class CreateAppComponent implements OnInit
{
    @ViewChild('modal') private modal: ModalDirective;
    
    public versionProviders = VERSION_PROVIDERS;
    
    public app: App;
    public versionProvider: VersionProvider;
    public errors: { field: string; errors: string[]; }[];
    
    public constructor (private appService: AppService) { }
    
    public ngOnInit()
    {
        const initialVersionProvider = VERSION_PROVIDERS[0];
        
        this.app = new App();
        this.app.name = '';
        this.app.websiteUrl = '';
        this.app.downloadUrl = '';
        this.app.versionProvider = initialVersionProvider.id;
        this.setVersionProvider(initialVersionProvider.id);
        this.errors = [];
    }
    
    public show(): void
    {
        this.modal.show();
    }
    
    public hide(): void
    {
        this.modal.hide();
    }
    
    public setVersionProvider(id: string): void
    {
        this.versionProvider = this.versionProviders.find(_ => _.id === id).create();
    }
    
    public save(): void
    {
        this.appService.saveApp(this.app, this.versionProvider)
            .then(() => this.hide())
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