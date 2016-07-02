<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\App;
use Illuminate\Http\Request;

class AppController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }
    
    public function index()
    {
        return view('apps.index', [
            'apps' => App::orderBy('name', 'asc')->get()
        ]);
    }
    
    public function create()
    {
        return view('apps.create');
    }
    
    public function store(Request $request)
    {
        $this->validate($request, [
            'name' => 'required|unique:apps,name|max:255',
            'website_url' => 'required|url|max:255',
            'download_url' => 'required|url|max:255'
        ]);
        
        $app = new App();
        $app->name = $request->name;
        $app->website_url = $request->website_url;
        $app->download_url = $request->download_url;
        $app->save();

        return redirect()->action('AppController@index');
    }
    
    public function edit(App $app)
    {
        return view('apps.edit', [
            'app' => $app
        ]);
    }
    
    public function update(Request $request, App $app)
    {
        $this->validate($request, [
            'name' => 'required|unique:apps,name,'.$app->id.'|max:255',
            'latest_version' => 'required|max:255',
            'website_url' => 'required|url|max:255',
            'download_url' => 'required|url|max:255'
        ]);
        
        $app->name = $request->name;
        $app->latest_version = $request->latest_version;
        $app->website_url = $request->website_url;
        $app->download_url = $request->download_url;
        $app->save();
        
        return redirect()->action('AppController@index');
    }
    
    public function destroy(App $app)
    {
        $app->delete();
    }
}
