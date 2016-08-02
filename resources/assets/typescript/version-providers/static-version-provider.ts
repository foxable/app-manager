import { VersionProvider } from './version-provider';

export class StaticVersionProvider implements VersionProvider
{
    public constructor(
        public latestVersion: string
    ) { }
}