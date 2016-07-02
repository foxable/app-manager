<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', function() {
    return redirect('/apps');
 });

 Route::model('app', 'App\App');
 
 Route::get('/apps/{app}/refresh', 'AppController@refresh');
 
 Route::resource('apps', 'AppController', [
     'parameters' => 'singular',
     'except' => ['show']
 ]);

Route::auth();
