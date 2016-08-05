import {Component, Input} from '@angular/core';

import {VersionProviderComponent} from '../common';
import {Html5VersionProvider} from './html5-version-provider';

@Component({
    selector: 'html5-version-provider',
    templateUrl: './html5-version-provider.html',
})
export class Html5VersionProviderComponent implements VersionProviderComponent
{
    @Input() public versionProvider: Html5VersionProvider;
}