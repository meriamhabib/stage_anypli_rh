<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DocumentController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\LeaveRequestController;
use App\Http\Controllers\NewsController;
use App\Http\Controllers\DocumentDownloadController;
use App\Http\Controllers\AuthController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
Route::apiResource('documents', DocumentController::class);
Route::apiResource('tasks', TaskController::class);
Route::apiResource('leave-requests',LeaveRequestController::class);
Route::apiResource('news', NewsController::class);
Route::apiResource('document-downloads', DocumentDownloadController::class)
    ->only([
        'index',
        'store',
        'show',
        'destroy'
    ]);

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::middleware('auth:sanctum')->group(function () {

    Route::get('/profile', [AuthController::class, 'profile']);

    Route::post('/logout', [AuthController::class, 'logout']);


}
);