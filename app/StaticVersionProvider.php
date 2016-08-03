<?php

namespace App;

class StaticVersionProvider extends VersionProvider
{
    public static $type = 'static';

    protected $fillable = ['latestVersion'];
    
    public function getVersion()
    {
        return $this->latestVersion;
    }
}
