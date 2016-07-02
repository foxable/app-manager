@extends('layouts.app')

@section('content')
<div class="container">
    <h1>All Applications</h1>
    <a href="{{ action('AppController@create') }}" class="btn btn-sm btn-primary">
        <i class="fa fa-plus"></i> Add Application
    </a>
    <table class="table table-striped table-hover">
        <thead>
            <tr>
                <th>Application</th>
                <th>Latest Version</th>         
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            @foreach($apps as $app)
            <tr>
                <td>{{ $app->name }}</td>
                <td>{{ $app->latest_version }}</td>
                <td>
                    <div class="btn-group">
                        <a href="{{ $app->download_url }}" class="btn btn-sm btn-info"><i class="fa fa-download" aria-hidden="true"></i> Download</a>
                        <a href="{{ $app->website_url }}" class="btn btn-sm btn-info"><i class="fa fa-globe" aria-hidden="true"></i> Website</a>
                    </div>
                    <a href="{{ action('AppController@edit', ['app' => $app]) }}" class="btn btn-sm btn-primary"><i class="fa fa-edit" aria-hidden="true"></i> Edit</a>
                    <form action="{{ action('AppController@destroy', ['app' => $app]) }}" method="POST" style="display: inline-block;">
                        {{ csrf_field() }}
                        {{ method_field('DELETE') }}

                        <button type="submit" class="btn btn-sm btn-danger">
                            <i class="fa fa-trash"></i> Delete
                        </button>
                    </form>                 
                </td>
                </td>
            </tr>
            @endforeach
        </tbody>
    </table>
</div>
@endsection