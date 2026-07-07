<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LeaveRequest extends Model
{
    protected $table = 'leave_requests';

    protected $fillable = [
        'user_id',
        'date_debut',
        'date_fin',
        'motif',
        'certificat',
        'statut',
        'date_demande',
        'traite_par',
        'commentaire',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }


    public function directeur()
    {
        return $this->belongsTo(User::class, 'traite_par');
    }
}