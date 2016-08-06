<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;

class AllAppsController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }
    
    public function index()
    {
        return view('all-apps.index');
    }
}
