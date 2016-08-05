import {Type} from '@angular/core';

import {VersionProvider} from './version-provider';

export interface VersionProviderMetadata
{
    id: string;
    name: string;
    componentType: Type;
    createModel: (attributes?: { [attribute: string]: string; }) => VersionProvider; 
}