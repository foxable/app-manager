import { VersionProvider } from './version-provider';

export class Html5VersionProvider implements VersionProvider
{
    public constructor(
        public url: string,
        public xpath: string,
        public regex: string
    ) { }   
}