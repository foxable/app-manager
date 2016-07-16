import { Component } from '@angular/core';

import { App } from './app';
import { AppService } from './app.service';
import { allAppsTemplate } from './all-apps.template';

@Component({
  selector: 'all-apps',
  template: allAppsTemplate,
  providers: [AppService]
})
export class AllAppsComponent
{
    
}