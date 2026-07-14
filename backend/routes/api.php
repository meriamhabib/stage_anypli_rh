<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\DocumentController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\LeaveRequestController;
use App\Http\Controllers\NewsController;
use App\Http\Controllers\DocumentDownloadController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\EmployeeController;



/*
|--------------------------------------------------------------------------
| Auth
|--------------------------------------------------------------------------
*/

Route::post('/login', [AuthController::class, 'login']);



/*
|--------------------------------------------------------------------------
| Routes protégées par Token Sanctum
|--------------------------------------------------------------------------
*/

Route::middleware('auth:sanctum')->group(function () {


    // Profil utilisateur connecté
    Route::get('/profile', [AuthController::class, 'profile']);


    // Déconnexion
    Route::post('/logout', [AuthController::class, 'logout']);



    /*
    |--------------------------------------------------------------------------
    | Employees
    |--------------------------------------------------------------------------
    */

    Route::get('/employees', [EmployeeController::class,'index']);

    Route::post('/employees', [EmployeeController::class,'store']);



    /*
    |--------------------------------------------------------------------------
    | Documents
    |--------------------------------------------------------------------------
    */

    Route::apiResource('documents', DocumentController::class);



    /*
    |--------------------------------------------------------------------------
    | Tasks
    |--------------------------------------------------------------------------
    */

    Route::apiResource('tasks', TaskController::class);



    /*
    |--------------------------------------------------------------------------
    | Leave Requests
    |--------------------------------------------------------------------------
    */

    Route::apiResource('leave-requests', LeaveRequestController::class);



    /*
    |--------------------------------------------------------------------------
    | News
    |--------------------------------------------------------------------------
    */

    Route::apiResource('news', NewsController::class);



    /*
    |--------------------------------------------------------------------------
    | Document Downloads
    |--------------------------------------------------------------------------
    */

    Route::apiResource('document-downloads', DocumentDownloadController::class)
        ->only([
            'index',
            'store',
            'show',
            'destroy'
        ]);

});