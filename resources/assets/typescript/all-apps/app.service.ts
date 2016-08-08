import {Injectable} from '@angular/core';
import {Headers, Http} from '@angular/http';

import 'rxjs/add/operator/toPromise';

import {App} from './app';
import {VersionProvider} from '../version-providers';

@Injectable()
export class AppService
{
    private appsUrl = 'api/apps';
    
    private headers = new Headers({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    });
    
    public constructor(private http: Http) { }
    
    public getAllApps(): Promise<App[]>
    {
        return this.http
            .get(this.appsUrl, { headers: this.headers })
            .toPromise()
            .then(response => response.json());
    }

    public getApp(appId: number): Promise<App>
    {
        
        const url = `${this.appsUrl}/${appId}`;

        return this.http
             .get(url, { headers: this.headers })
             .toPromise()
             .then(response => response.json());
    }
    
    public createApp(app: App): Promise<App>
    {
        const url = this.appsUrl;

        return this.http
            .post(url, JSON.stringify(app), { headers: this.headers })
            .toPromise()
            .then(response => response.json());
    }
    
    public updateApp(app: App): Promise<App>
    {
        const url = `${this.appsUrl}/${app.id}`;

        return this.http
             .put(url, JSON.stringify(app), { headers: this.headers })
             .toPromise()
             .then(response => response.json());
    }
    
    public saveApp(app: App): Promise<App>
    {
        return app.id ? this.updateApp(app) : this.createApp(app);
    }
    
    public deleteApp(appId: number): Promise<App>
    {       
        const url = `${this.appsUrl}/${appId}`;
        
        return this.http
             .delete(url, { headers: this.headers })
             .toPromise()
             .then(response => response.json());
    }
    
    public updateVersion(appId: number): Promise<{ version: string; }>
    {        
        const url = `${this.appsUrl}/${appId}/update-version`;

        return this.http
             .get(url, { headers: this.headers })
             .toPromise()
             .then(response => response.json());
    }
}