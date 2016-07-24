import { VersionProvider } from './version-provider';
import { EmptyVersionProvider } from './empty-version-provider';
import { Html5VersionProvider } from './html5-version-provider';

export interface VersionProviderFactory
{
    id: string;
    name: string;
    create(): VersionProvider;
}

export const VERSION_PROVIDERS: VersionProviderFactory[] = [
    {
        id: 'none',
        name: 'None',
        create: () => new EmptyVersionProvider()
    },
    {
        id: 'html5',
        name: 'HTML5',
        create: () => new Html5VersionProvider('', '', '')
    }
];