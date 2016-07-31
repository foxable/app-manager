<?php

namespace App;

class App extends BaseModel
{
    public static $snakeAttributes = false;
    
    protected $hidden = ['createdAt', 'updatedAt'];
    protected $appends = ['versionProvider'];
    
    protected static function boot()
    {
        parent::boot();
        
        // register events    
        static::saved(function($model) { static::savedApp($model); });        
        static::deleting(function($model) { static::deletingApp($model); });
    }
    
    public function getVersionProviderAttribute()
    {
        switch ($this->attributes['version_provider'])
        {
            case 'html5':
                return (object) array_add(
                    Html5VersionProvider::where('app_id', $this->id)->first(),
                    'type',
                    'html5'
                );
            case 'static':
            default:
                return (object) [
                    'type' => 'static',
                    'latestVersion' => $this->latestVersion
                ];
        }
    }
    
    public function setVersionProviderAttribute($value)
    {
        $this->versionProvider = $value;
        $this->attributes['version_provider'] = $value->type;
        
        switch ($value->type)
        {
            case 'static':
                $this->latestVersion = $value->latestVersion;
                break;
        }
    }
    
    private static function savedApp(App $app)
    {
        if ($app->isDirty('version_provider'))
        {
            // delete previous version provider
            switch ($app->getOriginal('version_provider'))
            {
                case 'html5':
                    Html5VersionProvider::where('app_id', $app->id)->delete();
            }
            var_dump($app->versionProvider);
            // create new version provider
            switch ($app->attributes['version_provider'])
            {
                case 'html5':
                    $versionProvider = new Html5VersionProvider();
                    $versionProvider->appId = $app->id;
                    $versionProvider->providerUrl = $app->versionProvider->providerUrl;
                    $versionProvider->xpath = $app->versionProvider->xpath;
                    $versionProvider->regex = $app->versionProvider->regex;
                    $versionProvider->save();
                    break;
            }
        }
    }
    
    private static function deletingApp(App $app)
    {
        switch ($app->attributes['version_provider'])
        {
            case 'html5':
                Html5VersionProvider::where('app_id', $app->id)->delete();
                break;
        }
    }
}
