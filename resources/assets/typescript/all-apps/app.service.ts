import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { App } from './app';

@Injectable()
export class AppService
{
    private appsUrl = 'apps';
    
    constructor(private http: Http) { }
    
    getAllApps(): Promise<App[]>
    {
        return this.http.get(this.appsUrl)
            .toPromise()
            .then(response => response.json().data)
            .catch(this.handleError);
    }
    
    getApp(appId: number): Promise<App>
    {
        return Promise.resolve(null);
    }
    
    createApp(app: App): Promise<App>
    {
        const headers = new Headers({
            'Content-Type': 'application/json'
        });
        const url = this.appsUrl;

        return this.http
             .post(url, JSON.stringify(app), { headers: headers })
             .toPromise()
             .then(response => response.json().data)
             .catch(this.handleError);
    }
    
    updateApp(appId: number, app: App): Promise<App>
    {
        const headers = new Headers({
            'Content-Type': 'application/json'
        });
        const url = `${this.appsUrl}/${appId}`;

        return this.http
             .put(url, JSON.stringify(null), { headers: headers })
             .toPromise()
             .then(response => response.json().data)
             .catch(this.handleError);
    }
    
    saveApp(app: App): Promise<App>
    {
        return app.id ? this.updateApp(app.id, app) : this.createApp(app);
    }
    
    deleteApp(appId: number): Promise<App>
    {
        const headers = new Headers({
            'Content-Type': 'application/json'
        });        
        const url = `${this.appsUrl}/${appId}`;
        
        return this.http
             .delete(url, { headers: headers })
             .toPromise()
             .then(response => response.json().data)
             .catch(this.handleError);
    }
    
    private handleError(error: any)
    {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}