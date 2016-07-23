import { Component, OnInit } from '@angular/core';

import { App } from './app';
import { AppService } from './app.service';
import { CreateAppComponent } from './create-app.component';

@Component({
  selector: 'all-apps',
  templateUrl: './all-apps.html',
  providers: [AppService],
  directives: [CreateAppComponent]
})
export class AllAppsComponent implements OnInit
{
    public apps: App[] = [];
    
    public constructor (private appService: AppService) { }
    
    private getApps(): void
    {
        this.appService.getAllApps().then(apps => this.apps = apps);
    }
    
    public ngOnInit(): void
    {
        this.getApps();
    }
}