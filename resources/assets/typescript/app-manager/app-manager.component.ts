import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

import { appManagerTemplate } from './app-manager.template';
import { AllAppsComponent } from '../all-apps/all-apps.component';

@Component({
    selector: 'app-manager',
    template: appManagerTemplate,
    directives: [ROUTER_DIRECTIVES],
    precompile: [AllAppsComponent]
})
export class AppManagerComponent
{
}