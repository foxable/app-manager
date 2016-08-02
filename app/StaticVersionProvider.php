<?php

namespace App;

class StaticVersionProvider extends VersionProvider
{
    public static $type = 'static';
    
    protected $hidden = ['id'];
}