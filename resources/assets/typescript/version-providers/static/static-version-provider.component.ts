import {Component, Input} from '@angular/core';

import {VersionProviderComponent} from '../common';
import {StaticVersionProvider} from './static-version-provider';

@Component({
    selector: 'static-version-provider',
    templateUrl: './static-version-provider.html',
})
export class StaticVersionProviderComponent implements VersionProviderComponent
{
    @Input() public versionProvider: StaticVersionProvider;
}