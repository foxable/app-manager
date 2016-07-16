///<reference path="../../../typings/index.d.ts/"/>

import { bootstrap } from '@angular/platform-browser-dynamic';
import { HTTP_PROVIDERS } from '@angular/http';

import { AppManagerComponent } from './app-manager/app-manager.component';
import { APP_MANAGER_ROUTER_PROVIDERS } from './app-manager/app-manager.routes';

bootstrap(AppManagerComponent, [
    APP_MANAGER_ROUTER_PROVIDERS,
    HTTP_PROVIDERS        
]);