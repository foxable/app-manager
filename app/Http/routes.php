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
    return redirect('/all-apps');
 });

Route::get('/all-apps', 'AllAppsController@index');

Route::group(['prefix' => 'api/apps'], function() {
    Route::model('app', 'App\App');
    
    Route::get('/', 'Api\AppController@index');
    Route::post('/', 'Api\AppController@store');
        
    Route::get('/{app}', 'Api\AppController@show');        
    Route::put('/{app}', 'Api\AppController@update');
    Route::delete('/{app}', 'Api\AppController@destroy');
    
    Route::get('/{app}/update-version', 'Api\AppController@updateVersion');
});

Route::auth();
