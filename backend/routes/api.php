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



    // Employees (director only)
    Route::middleware('role:director')->group(function () {
        Route::get('/employees', [EmployeeController::class,'index']);
        Route::post('/employees', [EmployeeController::class,'store']);
    });



    // Documents: everyone authenticated can read, only directors can manage
    Route::apiResource('documents', DocumentController::class)
        ->only(['index', 'show']);

    Route::middleware('role:director')->group(function () {
        Route::apiResource('documents', DocumentController::class)
            ->only(['store', 'update', 'destroy']);
    });



    // Tasks
    Route::apiResource('tasks', TaskController::class);



    // Leave requests: employees submit/view, directors oversee and process
    Route::apiResource('leave-requests', LeaveRequestController::class)
        ->only(['store', 'show']);

    Route::middleware('role:director')->group(function () {
        Route::apiResource('leave-requests', LeaveRequestController::class)
            ->only(['index', 'update', 'destroy']);
    });



    // News: everyone authenticated can read, only directors can manage
    Route::apiResource('news', NewsController::class)
        ->only(['index', 'show']);

    Route::middleware('role:director')->group(function () {
        Route::apiResource('news', NewsController::class)
            ->only(['store', 'update', 'destroy']);
    });



    // Downloads
    Route::apiResource(
        'document-downloads',
        DocumentDownloadController::class
    )->only([
        'store',
        'show',
    ]);

    Route::middleware('role:director')->group(function () {
        Route::apiResource(
            'document-downloads',
            DocumentDownloadController::class
        )->only([
            'index',
            'destroy',
        ]);
    });



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