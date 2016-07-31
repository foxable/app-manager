import { VersionProvider } from './version-provider';

export class StaticVersionProvider implements VersionProvider
{
    public type = "static";
    
    public constructor(
        public latestVersion: string
    ) { }
}