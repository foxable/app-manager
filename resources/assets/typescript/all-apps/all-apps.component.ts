import { Component, OnInit } from '@angular/core';

import { App } from './app';
import { AppService } from './app.service';
import { allAppsTemplate } from './all-apps.template';

@Component({
  selector: 'all-apps',
  template: allAppsTemplate,
  providers: [AppService]
})
export class AllAppsComponent implements OnInit
{
    public apps: App[] = [];
    
    constructor (private appService: AppService)
    {        
    }
    
    private getApps(): void
    {
        this.appService.getAllApps().then(apps => this.apps = apps);
    }
    
    public ngOnInit(): void
    {
        this.getApps();
    }
}