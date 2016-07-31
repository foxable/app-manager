import { VersionProvider } from '../version-providers/version-provider';

export class App
{
    public id: number;
    
    public constructor(
        public name: string,
        public latestVersion: string,
        public websiteUrl: string,
        public downloadUrl: string,
        public versionProvider: VersionProvider
    ) { }   
}