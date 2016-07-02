<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\App;
use App\HTML5VersionProvider;
use Illuminate\Http\Request;

class AppController extends Controller
{
    private $versionProviders = [
        'none' => 'None',
        'html5' => 'HTML5'
    ];
    
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
        return view('apps.create', [
            'versionProviders' => $this->versionProviders
        ]);
    }
    
    public function store(Request $request)
    {
        $this->validate($request, [
            'name' => 'required|unique:apps,name|max:255',
            'website_url' => 'required|url|max:255',
            'download_url' => 'required|url|max:255',
            'version_provider' => 'required|in:none,html5',
            'provider_url' => 'required|url|max:255',
            'provider_xpath' => 'required|max:255',
            'provider_regex' => 'required|max:255'
        ]);
        
        $app = new App();
        $app->name = $request->name;
        $app->website_url = $request->website_url;
        $app->download_url = $request->download_url;
        $app->version_provider = $request->version_provider;
        $app->save();
        
        if ($request->version_provider === 'html5')
        {
            $versionProvider = new HTML5VersionProvider();
            $versionProvider->app_id = $app->id;
            $versionProvider->provider_url = $request->provider_url;
            $versionProvider->xpath = $request->xpath;
            $versionProvider->regex = $request->regex;
            $versionProvider->save();
        }        

        return redirect()->action('AppController@index');
    }
    
    public function edit(App $app)
    {
        return view('apps.edit', [
            'app' => $app,
            'versionProvider' => $app->versionProvider(),
            'versionProviders' => $this->versionProviders
        ]);
    }
    
    public function update(Request $request, App $app)
    {
        $this->validate($request, [
            'name' => 'required|unique:apps,name,'.$app->id.'|max:255',
            'latest_version' => 'required|max:255',
            'website_url' => 'required|url|max:255',
            'download_url' => 'required|url|max:255',
            'version_provider' => 'required|in:none,html5',
            'provider_url' => 'required|url|max:255',
            'provider_xpath' => 'required|max:255',
            'provider_regex' => 'required|max:255'
        ]);
        
        $previousVersionProviderName = $app->version_provider;
        $previousVersionProvider = $app->versionProvider();
        
        $app->name = $request->name;
        $app->latest_version = $request->latest_version;
        $app->website_url = $request->website_url;
        $app->download_url = $request->download_url;
        $app->version_provider = $request->version_provider;
        $app->save();
        
        if ($app->version_provider !== $previousVersionProviderName
         && $previousVersionProviderName !== 'none')
        {
            $previousVersionProvider->delete();
        }
        
        if ($app->version_provider === 'html5')
        {
            $versionProvider = $previousVersionProviderName === 'html5' ? $previousVersionProvider : new HTML5VersionProvider();
            $versionProvider->app_id = $app->id;
            $versionProvider->provider_url = $request->provider_url;
            $versionProvider->xpath = $request->provider_xpath;
            $versionProvider->regex = $request->provider_regex;
            $versionProvider->save();
        }        
        
        
        return redirect()->action('AppController@index');
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
