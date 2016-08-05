import {VersionProviderMetadata} from './common';
import {StaticVersionProvider, StaticVersionProviderComponent} from './static-version-provider';
import {Html5VersionProvider, Html5VersionProviderComponent} from './html5-version-provider';

export const VERSION_PROVIDERS: VersionProviderMetadata[] = [
    {
        id: 'static',
        name: 'Static',        
        componentType: StaticVersionProviderComponent,
        createModel: () => new StaticVersionProvider()
    },
    {
        id: 'html5',
        name: 'HTML5',       
        componentType: Html5VersionProviderComponent,
        createModel: () => new Html5VersionProvider()
    }
];