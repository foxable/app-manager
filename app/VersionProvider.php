<?php

namespace App;

class VersionProvider extends BaseModel
{
    protected $hidden = ['id'];

    public function app()
    {
        return $this->morphOne('App\App', 'versionProvider');
    }
}

