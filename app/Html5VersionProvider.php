<?php

namespace App;

use Masterminds\HTML5;

class Html5VersionProvider extends BaseModel
{
    protected $hidden = ['id', 'app_id', 'created_at', 'updated_at'];
    
    protected $table = 'apps_html5_version_providers';
    
    public function app()
    {
        return $this->belongsTo('App\App');
    }
    
    public function getVersion()
    {
        $html = file_get_contents($this->provider_url);
        $parser = new HTML5();
        $doc = $parser->loadHTML($html);
        
        $xpath = new \DOMXpath($doc);

        $node = $xpath->query($this->xpath)->item(0);

        $hasMatch = preg_match($this->regex, $node->nodeValue, $matches);
        
        return $hasMatch ? $matches[1] : 'Unknown';
    }
}