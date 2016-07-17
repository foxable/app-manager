import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { App } from './app';

@Injectable()
export class AppService
{
    private appsUrl = 'apps';
    
    public constructor(private http: Http) { }
    
    public getAllApps(): Promise<App[]>
    {
        return this.http.get(this.appsUrl)
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }
    
    public getApp(appId: number): Promise<App>
    {
        return Promise.resolve(null);
    }
    
    public createApp(app: App): Promise<App>
    {
        const headers = new Headers({
            'Content-Type': 'application/json'
        });
        const url = this.appsUrl;

        return this.http
             .post(url, JSON.stringify(app), { headers: headers })
             .toPromise()
             .then(response => response.json())
             .catch(this.handleError);
    }
    
    public updateApp(appId: number, app: App): Promise<App>
    {
        const headers = new Headers({
            'Content-Type': 'application/json'
        });
        const url = `${this.appsUrl}/${appId}`;

        return this.http
             .put(url, JSON.stringify(null), { headers: headers })
             .toPromise()
             .then(response => response.json())
             .catch(this.handleError);
    }
    
    public saveApp(app: App): Promise<App>
    {
        return app.id ? this.updateApp(app.id, app) : this.createApp(app);
    }
    
    public deleteApp(appId: number): Promise<App>
    {
        const headers = new Headers({
            'Content-Type': 'application/json'
        });        
        const url = `${this.appsUrl}/${appId}`;
        
        return this.http
             .delete(url, { headers: headers })
             .toPromise()
             .then(response => response.json())
             .catch(this.handleError);
    }
    
    private handleError(error: any)
    {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}