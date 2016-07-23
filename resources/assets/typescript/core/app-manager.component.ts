import { Component, ViewContainerRef } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

import { AllAppsComponent } from '../all-apps/all-apps.component';

@Component({
    selector: 'app-manager',
    templateUrl: './app-manager.html',
    directives: [ROUTER_DIRECTIVES],
    precompile: [AllAppsComponent]
})
export class AppManagerComponent
{
    public viewContainerRef: ViewContainerRef;
    
    public constructor(viewContainerRef: ViewContainerRef)
    {
        this.viewContainerRef = viewContainerRef;
    }
}