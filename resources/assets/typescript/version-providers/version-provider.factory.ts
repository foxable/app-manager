import { VersionProvider } from './version-provider';
import { StaticVersionProvider } from './static-version-provider';
import { Html5VersionProvider } from './html5-version-provider';

export const VERSION_PROVIDERS: { id: string; name: string; }[] = [
    {
        id: 'static',
        name: 'Static'
    },
    {
        id: 'html5',
        name: 'HTML5'
    }
];

export const VERSION_PROVIDER_FACTORY: { [id: string]: () => VersionProvider; } =
{
    static: () => new StaticVersionProvider(''),
    html5: () => new Html5VersionProvider('', '', '')
};