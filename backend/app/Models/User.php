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
        'nom',
        'prenom',
        'email',
        'password',
        'telephone',
        'role',
        'poste',
        'date_embauche',
    ];


    protected $hidden = [
        'password',
        'remember_token',
    ];


    protected function casts(): array
    {
        return [
            'date_embauche' => 'date',
            'password' => 'hashed',
        ];
    }


    // Un directeur publie des documents
    public function documents()
    {
        return $this->hasMany(Document::class, 'created_by');
    }


    // Un employé possède des tâches
    public function tasks()
    {
        return $this->hasMany(Task::class, 'user_id');
    }


    // Demandes de congé envoyées par l'employé
    public function leaveRequests()
    {
        return $this->hasMany(LeaveRequest::class, 'user_id');
    }


    // Demandes traitées par un directeur
    public function treatedLeaveRequests()
    {
        return $this->hasMany(LeaveRequest::class, 'traite_par');
    }


    // Actualités publiées par un directeur
    public function news()
    {
        return $this->hasMany(News::class, 'created_by');
    }


    // Téléchargements effectués par un utilisateur
    public function documentDownloads()
    {
        return $this->hasMany(DocumentDownload::class, 'user_id');
    }
}