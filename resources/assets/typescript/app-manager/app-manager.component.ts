import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

import { appManagerTemplate } from './app-manager.template';

@Component({
    selector: 'app-manager',
    template: appManagerTemplate,
    directives: [ROUTER_DIRECTIVES]
})
export class AppManagerComponent { }