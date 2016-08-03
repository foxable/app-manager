<?php

namespace App;

abstract class VersionProvider extends BaseModel
{
    public $timestamps = false;
    
    protected $hidden = ['id'];

    public function app()
    {
        return $this->morphOne('App\App', 'versionProvider');
    }
    
    abstract function getVersion();
}

