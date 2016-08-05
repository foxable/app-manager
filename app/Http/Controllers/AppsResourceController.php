<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\App;
use App\Html5VersionProvider;
use App\StaticVersionProvider;
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
        
        $app = new App($request);        
        
        switch ($request->versionProviderType)
        {
            case 'static':
                $versionProvider = new StaticVersionProvider($request->versionProvider);
                $app->latestVersion = $versionProvider->latestVersion;
                breaK;
            case 'html5':
                $versionProvider = new Html5VersionProvider($request->versionProvider);
                break;
        }
        
        $app->save();
        
        $versionProvider->save();        
        $versionProvider->app()->save($app);

        return $app->toJson();
    }
    
    public function update(Request $request, App $app)
    {
        $this->validateApp($request, $app);

        $app->fill($request->only(['name', 'websiteUrl', 'downloadUrl']));        
        
        // version provider type changed
        if ($app->versionProviderType !== $request->versionProviderType)
        {
            // delete previous version provider
            $app->versionProvider->delete();
            
            // create new version provider
            switch ($request->versionProviderType)
            {
                case 'static':
                    $versionProvider = new StaticVersionProvider($request->versionProvider);
                    $app->latestVersion = $versionProvider->latestVersion;
                    break;
                case 'html5':
                    $versionProvider = new Html5VersionProvider($request->versionProvider);
                    break;
            }

            $versionProvider->save();
            $versionProvider->app()->save($app);
        }
        // previous version provider updated
        else
        {
            // create new version provider
            switch ($app->versionProviderType)
            {
                case 'static':
                    $app->versionProvider->fill($request->versionProvider);
                    $app->latestVersion = $app->versionProvider->latestVersion;
                    break;
                case 'html5':
                    $app->versionProvider->fill($request->versionProvider);
                    break;
            }
            
            $app->versionProvider->save();
        }
        
        $app->save();
        
        return $app->toJson();
    }
    
    private function validateApp(Request $request, App $app = null)
    {
        $this->validate($request, [
            'name' => 'required|max:255|unique:apps,name' . ($app ? ',' . $app->id : ''),
            'websiteUrl' => 'required|url|max:255',
            'downloadUrl' => 'required|url|max:255',
            'versionProviderType' => 'required|in:static,html5',
            'versionProvider.latestVersion' => 'required_if:versionProviderType,static|max:255',
            'versionProvider.providerUrl' => 'required_if:versionProviderType,html5|url|max:255',
            'versionProvider.xpath' => 'required_if:versionProviderType,html5|max:255',
            'versionProvider.regex' => 'required_if:versionProviderType,html5|max:255'
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
