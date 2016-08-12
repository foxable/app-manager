<?php

namespace App;

class StaticVersionProvider extends VersionProvider
{
    public static $type = 'static';

    protected $fillable = ['version'];
    
    public function getVersion()
    {
        return $this->version;
    }
}
