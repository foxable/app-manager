@extends('layouts.app')

@section('content')
<div class="container">
    <h1>Add Application</h1>
    <div class="panel-body">
        @include('common.errors')

        <form action="{{ action('AppController@store') }}" method="POST" class="form-horizontal">
            {{ csrf_field() }}

            <div class="form-group">
                <label for="name" class="col-sm-3 control-label">Name</label>
                <div class="col-sm-6">
                    <input type="text" name="name" value="{{ old('name') }}" id="name" class="form-control"/>
                </div>
            </div>
            <div class="form-group">
                <label for="website_url" class="col-sm-3 control-label">Website-URL</label>
                <div class="col-sm-6">
                    <input type="text" name="website_url" value="{{ old('website_url') }}" id="website_url" class="form-control"/>
                </div>
            </div>
            <div class="form-group">
                <label for="download_url" class="col-sm-3 control-label">Download-URL</label>
                <div class="col-sm-6">
                    <input type="text" name="download_url" value="{{ old('download_url') }}" id="download_url" class="form-control"/>
                </div>
            </div>

            <div class="form-group">
                <div class="col-sm-offset-3 col-sm-6">
                    <button type="submit" class="btn btn-primary">
                        <i class="fa fa-check"></i> Create Application
                    </button>
                    <a href="{{ action('AppController@index') }}" class="btn btn-default"><i class="fa fa-times"></i> Cancel</a>
                </div>
            </div>
        </form>
    </div>
</div>
@endsection