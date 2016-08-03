<?php

namespace App;

class App extends BaseModel
{
    public static $snakeAttributes = false;
    
    protected $fillable = ['name', 'websiteUrl', 'downloadUrl'];
    protected $hidden = ['versionProviderId', 'createdAt', 'updatedAt'];
    protected $appends = ['versionProvider'];
    
    public function getVersionProviderAttribute()
    {
        return $this->versionProvider;
    }
    
    public function versionProvider()
    {
        return $this->morphTo();
    }
}
