///<reference path="../../../typings/index.d.ts/"/>

import { bootstrap } from '@angular/platform-browser-dynamic';
import { HTTP_PROVIDERS } from '@angular/http';
//import { enableProdMode } from '@angular/core';

import { AppManagerComponent } from './app-manager/app-manager.component';
import { APP_MANAGER_ROUTER_PROVIDERS } from './app-manager/app-manager.routes';

//enableProdMode();
bootstrap(AppManagerComponent, [
    APP_MANAGER_ROUTER_PROVIDERS,
    HTTP_PROVIDERS        
]);