<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\App;
use App\Html5VersionProvider;
use Illuminate\Http\Request;

class AppsResourceController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }
    
    public function index(Request $request)
    {
        return App::orderBy('name', 'asc')->get()->toJson();
    }
    
    public function show(App $app)
    {        
        return $app->toJson();
    }
    
    public function store(Request $request)
    {
        $this->validateApp($request);
        
        $app = new App();
        $app->name = $request->name;
        $app->websiteUrl = $request->websiteUrl;
        $app->downloadUrl = $request->downloadUrl;
        $app->save();
        
        $app->versionProvider->save($request->versionProvider);

        return $app->toJson();
    }
    
    public function update(Request $request, App $app)
    {
        $this->validateApp($request, $app);

        $app->name = $request->name;
        $app->websiteUrl = $request->websiteUrl;
        $app->downloadUrl = $request->downloadUrl;
        $app->save();
        
        $app->versionProvider->save($request->versionProvider);
        
        return $app->toJson();
    }
    
    private function validateApp(Request $request, App $app = null)
    {
        $this->validate($request, [
            'name' => 'required|max:255|unique:apps,name' . ($app ? ',' . $app->id : ''),
            'websiteUrl' => 'required|url|max:255',
            'downloadUrl' => 'required|url|max:255',
            'versionProvider.type' => 'required|in:static,html5',
            'versionProvider.latestVersion' => 'required_if:versionProvider.type,static|max:255',
            'versionProvider.url' => 'required_if:versionProvider.type,html5|url|max:255',
            'versionProvider.xpath' => 'required_if:versionProvider.type,html5|max:255',
            'versionProvider.regex' => 'required_if:versionProvider.type,html5|max:255'
        ]); 
    }
    
    public function destroy(App $app)
    {
        $app->delete();
    }
    
    public function refresh(App $app)
    {
        $versionProvider = $app->versionProvider();
        
        $app->latest_version = $versionProvider->getVersion();
        $app->save();
        
        return redirect()->action('AppController@index');
    }
}
