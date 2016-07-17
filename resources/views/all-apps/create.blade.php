<div class="modal-header">
    <h3 class="modal-title">Add Application</h3>        
</div>
<div class="modal-body">
    <div class="alert alert-danger" ng-show="errors">
        <ul ng-repeat="(field, errors) in errors">
            <li ng-repeat="error in errors">@{{ error }}</li>
        </ul>
    </div>
    <uib-tabset active="active">
        <uib-tab index="0" heading="Application">
            <div class="form-horizontal">
                <div class="form-group">
                    <label for="name" class="col-sm-3 control-label">Name</label>
                    <div class="col-sm-6">
                        <input type="text" id="name" class="form-control" ng-model="app.name" />
                    </div>
                </div>
                <div class="form-group">
                    <label for="website_url" class="col-sm-3 control-label">Website-URL</label>
                    <div class="col-sm-6">
                        <input type="text" id="website_url" class="form-control" ng-model="app.websiteUrl" />
                    </div>
                </div>
                <div class="form-group">
                    <label for="download_url" class="col-sm-3 control-label">Download-URL</label>
                    <div class="col-sm-6">
                        <input type="text" id="download_url" class="form-control" ng-model="app.downloadUrl" />
                    </div>
                </div>                
            </div>
        </uib-tab>
        <uib-tab index="1" heading="Version Provider">
            <div class="form-horizontal"> 
                <div class="form-group">
                    <label for="version_provider" class="col-sm-3 control-label">Version Provider</label>
                    <div class="col-sm-6">
                        <select type="text" id="version_provider" class="form-control" ng-model="app.versionProvider">
                            @foreach($availableVersionProviders as $key => $name)
                                <option value="{{ $key }}">{{ $name }}</option>
                            @endforeach
                        </select>
                    </div>
                </div>
                <div ng-show="app.versionProvider === 'html5'">
                    <div class="form-group">
                        <label for="html5provider_url" class="col-sm-3 control-label">Provider URL</label>
                        <div class="col-sm-6">
                            <input type="text" id="html5provider_url" class="form-control" ng-model="html5VersionProvider.url" />
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="html5provider_xpath" class="col-sm-3 control-label">XPath Selector</label>
                        <div class="col-sm-6">
                            <input type="text" id="html5provider_xpath" class="form-control" ng-model="html5VersionProvider.xpath" />
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="html5provider_regex" class="col-sm-3 control-label">RegExp</label>
                        <div class="col-sm-6">
                            <input type="text"  id="html5provider_regex" class="form-control" ng-model="html5VersionProvider.regex" />
                        </div>
                    </div>
                </div>
            </div>   
        </uib-tab>
    </uib-tabset>
</div>
<div class="modal-footer">
    <button type="submit" class="btn btn-primary" ng-click="save()">
        <i class="fa fa-check"></i> Save Application
    </button>
    <button class="btn btn-default" ng-click="cancel()">
        <i class="fa fa-times"></i> Cancel
    </button>
</div>