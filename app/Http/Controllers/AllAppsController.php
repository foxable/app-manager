<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;

class AllAppsController extends Controller
{
    private $availableVersionProviders = [
        'none' => 'None',
        'html5' => 'HTML5'
    ];
    
    public function __construct()
    {
        $this->middleware('auth');
    }
    
    public function getIndex()
    {
        return view('all-apps.index');
    }
    
    public function getCreate()
    {
        return view('all-apps.create', [
            'availableVersionProviders' => $this->availableVersionProviders
        ]);
    }
    
    public function getEdit()
    {
        return view('all-apps.edit', [
            'availableVersionProviders' => $this->availableVersionProviders
        ]);
    }
}
