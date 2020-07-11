<?php

use Illuminate\Support\Facades\Route;

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

Route::group(['prefix' => 'api'], function () {
    Route::post('/login', 'LoginController@login')->name('login');
    Route::get('/movies', function() {
        return response()->json([
            'movies' => \App\Movie::with(['genres','actors','directors','languages','countries'])->take(50)->get()
        ]);
    });
});


Route::get('/{any}', function () {
    return view('welcome');
})->where('any','.*');


Route::get('/home', 'HomeController@index')->name('home');
