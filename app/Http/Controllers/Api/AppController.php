<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\App;
use App\Html5VersionProvider;
use App\StaticVersionProvider;
use Illuminate\Http\Request;

class AppController extends Controller
{    
    public function __construct()
    {
        $this->middleware('auth');
    }
    
    public function index()
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
        
        $app = new App($request->only(['name', 'websiteUrl', 'downloadUrl']));
        $app->save();
        
        switch ($request->versionProviderType)
        {
            case 'static':
                $versionProvider = new StaticVersionProvider($request->versionProvider);
                breaK;
            case 'html5':
                $versionProvider = new Html5VersionProvider($request->versionProvider);
                break;
        }
        
        $versionProvider->save();        
        $versionProvider->app()->save($app);

        return $app->toJson();
    }
    
    public function update(Request $request, App $app)
    {
        $this->validateApp($request, $app);

        $app->fill($request->only(['name', 'websiteUrl', 'downloadUrl'])); 
        $app->save();
        
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
                    break;
                case 'html5':
                    $app->versionProvider->fill($request->versionProvider);
                    break;
            }
            
            $app->versionProvider->save();
        }        
        
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
        
        return $app->toJson();
    }
    
    public function updateVersion(App $app)
    {
        $versionProvider = $app->versionProvider;
        
        $version = $versionProvider->getVersion();
        
        $app->latestVersion = $version;
        $app->save();
        
        return response()->json(['version' => $version]);
    }
}
