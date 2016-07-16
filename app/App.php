<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\HTML5VersionProvider;

class App extends Model
{
    protected $hidden = ['created_at', 'updated_at'];
    
    public function versionProvider()
    {
        if ($this->version_provider === 'html5')
        {
            return HTML5VersionProvider::where('app_id', $this->id)->first();
        }
        
        return null;
    }
}
