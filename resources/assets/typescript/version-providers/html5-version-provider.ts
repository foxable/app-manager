import { VersionProvider } from './version-provider';

export class Html5VersionProvider implements VersionProvider
{ 
    public constructor(
        public providerUrl: string,
        public xpath: string,
        public regex: string
    ) { }   
}