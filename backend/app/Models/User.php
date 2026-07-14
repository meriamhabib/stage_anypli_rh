<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;


    protected $fillable = [
        'last_name',
        'first_name',
        'email',
        'password',
        'phone',
        'role',
        'position',
        'hire_date',
    ];


    protected $hidden = [
        'password',
        'remember_token',
    ];


    protected function casts(): array
    {
        return [
            'hire_date' => 'date',
            'password' => 'hashed',
        ];
    }


    // A director publishes documents
    public function documents()
    {
        return $this->hasMany(Document::class, 'created_by');
    }


    // An employee owns tasks
    public function tasks()
    {
        return $this->hasMany(Task::class, 'user_id');
    }


    // Leave requests sent by the employee
    public function leaveRequests()
    {
        return $this->hasMany(LeaveRequest::class, 'user_id');
    }


    // Leave requests processed by a director
    public function treatedLeaveRequests()
    {
        return $this->hasMany(LeaveRequest::class, 'processed_by');
    }


    // News published by a director
    public function news()
    {
        return $this->hasMany(News::class, 'created_by');
    }


    // Downloads made by a user
    public function documentDownloads()
    {
        return $this->hasMany(DocumentDownload::class, 'user_id');
    }
}