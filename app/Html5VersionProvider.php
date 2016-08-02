<?php

namespace App;

use Masterminds\HTML5;

class Html5VersionProvider extends VersionProvider
{
    public static $type = 'html5';
    
    protected $hidden = ['id'];

    public function app()
    {
        return $this->morphOne('App\App', 'versionProvider');
    }
    
    public function getVersion()
    {
        $html = file_get_contents($this->providerUrl);
        $parser = new HTML5();
        $doc = $parser->loadHTML($html);
        
        $xpath = new \DOMXpath($doc);

        $node = $xpath->query($this->xpath)->item(0);

        $hasMatch = preg_match($this->regex, $node->nodeValue, $matches);
        
        return $hasMatch ? $matches[1] : 'Unknown';
    }
}