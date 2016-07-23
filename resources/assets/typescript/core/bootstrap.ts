///<reference path="../../../../typings/index.d.ts/"/>

import { bootstrap } from '@angular/platform-browser-dynamic';
import { HTTP_PROVIDERS } from '@angular/http';
//import { enableProdMode } from '@angular/core';

import { AppManagerComponent } from './app-manager.component';
import { ROUTER_PROVIDERS } from './app-manager.routes';

//enableProdMode();
bootstrap(AppManagerComponent, [
    ROUTER_PROVIDERS,
    HTTP_PROVIDERS        
]);