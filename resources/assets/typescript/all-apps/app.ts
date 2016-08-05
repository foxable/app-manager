import {VersionProvider} from '../version-providers';

export class App
{
    public id = 0;
    public name = '';
    public latestVersion = '';
    public websiteUrl = '';
    public downloadUrl = '';
    public versionProviderType = '';
    public versionProvider: VersionProvider = null; 
}