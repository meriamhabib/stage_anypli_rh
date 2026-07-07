<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    protected $table = 'tasks';

    protected $fillable = [
        'user_id',
        'titre',
        'description',
        'priorite',
        'statut',
        'date_echeance',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}