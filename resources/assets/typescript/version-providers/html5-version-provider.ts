import { VersionProvider } from './version-provider';

export class Html5VersionProvider implements VersionProvider
{
    public type = "html5";
    
    public constructor(
        public url: string,
        public xpath: string,
        public regex: string
    ) { }   
}