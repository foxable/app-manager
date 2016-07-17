@extends('layouts.app')

@section('content')
<div class="container" ng-controller="AppController">
    <h1>Edit Application</h1>
    <div class="panel-body">
        @include('common.errors')

        <form action="{{ action('AppController@update', ['app' => $app]) }}" method="POST" class="form-horizontal">
            {{ csrf_field() }}
            {{ method_field('PUT') }}

            <fieldset>
                <legend>Application</legend>
                <div class="form-group">
                    <label for="name" class="col-sm-3 control-label">Name</label>
                    <div class="col-sm-6">
                        <input type="text" name="name" value="{{ old('name', $app->name) }}" id="name" class="form-control"/>
                    </div>
                </div>
                <div class="form-group">
                    <label for="latest_version" class="col-sm-3 control-label">Latest Version</label>
                    <div class="col-sm-6">
                        <input type="text" name="latest_version" value="{{ old('latest_version', $app->latest_version) }}" id="latest_version" class="form-control"/>
                    </div>
                </div>
                <div class="form-group">
                    <label for="website_url" class="col-sm-3 control-label">Website-URL</label>
                    <div class="col-sm-6">
                        <input type="text" name="website_url" value="{{ old('website_url', $app->website_url) }}" id="website_url" class="form-control"/>
                    </div>
                </div>
                <div class="form-group">
                    <label for="download_url" class="col-sm-3 control-label">Download-URL</label>
                    <div class="col-sm-6">
                        <input type="text" name="download_url" value="{{ old('download_url', $app->download_url) }}" id="download_url" class="form-control"/>
                    </div>
                </div>
                <div class="form-group">
                    <label for="version_provider" class="col-sm-3 control-label">Version Provider</label>
                    <div class="col-sm-6">
                        <select type="text" name="version_provider" id="version_provider" class="form-control" ng-model="versionProvider" ng-init="versionProvider = '{{ old('version_provider', $app->version_provider) }}'">
                            @foreach($versionProviders as $key => $name)
                                <option value="{{ $key }}">{{ $name }}</option>
                            @endforeach
                        </select>
                    </div>
                </div>
            </fieldset>
            
            <fieldset ng-show="versionProvider === 'html5'">
                <legend>HTML5 Version Provider</legend>                
                <div class="form-group">
                    <label for="provider_url" class="col-sm-3 control-label">Provider URL</label>
                    <div class="col-sm-6">
                        <input type="text" name="provider_url" value="{{ old('provider_url', $versionProvider->provider_url) }}" id="provider_url" class="form-control"/>
                    </div>
                </div>
                <div class="form-group">
                    <label for="provider_xpath" class="col-sm-3 control-label">XPath Selector</label>
                    <div class="col-sm-6">
                        <input type="text" name="provider_xpath" value="{{ old('provider_xpath', $versionProvider->xpath) }}" id="provider_xpath" class="form-control"/>
                    </div>
                </div>
                <div class="form-group">
                    <label for="provider_regex" class="col-sm-3 control-label">RegExp</label>
                    <div class="col-sm-6">
                        <input type="text" name="provider_regex" value="{{ old('provider_regex', $versionProvider->regex) }}" id="provider_regex" class="form-control"/>
                    </div>
                </div>             
            </fieldset>

            <div class="form-group">
                <div class="col-sm-offset-3 col-sm-6">
                    <button type="submit" class="btn btn-primary">
                        <i class="fa fa-check"></i> Save Changes
                    </button>
                    <a href="{{ action('AppController@index') }}" class="btn btn-default"><i class="fa fa-times"></i> Cancel</a>
                </div>
            </div>            
        </form>
    </div>
</div>
@endsection