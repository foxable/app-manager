import { provideRouter, RouterConfig }  from '@angular/router';
import { AllAppsComponent } from '../all-apps/all-apps.component';

const routes: RouterConfig = [
    {
        path: '',
        redirectTo: '/all-apps',
        pathMatch: 'full'
    },
    {
        path: 'all-apps',
        component: AllAppsComponent
    }
];

export const ROUTER_PROVIDERS = [
    provideRouter(routes)
];