<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
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
