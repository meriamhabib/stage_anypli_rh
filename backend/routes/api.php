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



Route::post('/login', [AuthController::class, 'login']);

Route::post('/forgot-password', [AuthController::class, 'forgotPassword']);

Route::post('/reset-password', [AuthController::class, 'resetPassword']);



Route::middleware('auth:sanctum')->group(function () {


    Route::get('/user', function (Request $request) {

        return $request->user();

    });



    // Employees
    Route::get('/employees', [EmployeeController::class,'index']);
    Route::get('/directors', [EmployeeController::class,'getDirectors']);

    Route::post('/employees', [EmployeeController::class,'store']);




    // Documents
    Route::apiResource('documents', DocumentController::class);

    // Télécharger un document (stream + enregistrement du téléchargement)
    Route::get('documents/{document}/download', [DocumentController::class, 'download']);



    // Tasks
    Route::apiResource('tasks', TaskController::class);



    // Leave requests
    Route::apiResource(
        'leave-requests',
        LeaveRequestController::class
    );



    // News
    Route::apiResource(
        'news',
        NewsController::class
    );



    // Downloads
    Route::apiResource(
        'document-downloads',
        DocumentDownloadController::class
    )->only([
        'index',
        'store',
        'show',
        'destroy'
    ]);



    // Profile
    Route::get(
        '/profile',
        [AuthController::class,'profile']
    );



    // Logout
    Route::post(
        '/logout',
        [AuthController::class,'logout']
    );


});