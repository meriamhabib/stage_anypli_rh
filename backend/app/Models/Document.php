<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Document extends Model
{
    protected $table = 'documents';

    protected $fillable = [
        'titre',
        'description',
        'chemin_fichier',
        'type_document',
        'created_by',
    ];

    public function auteur()
    {
        return $this->belongsTo(User::class, 'created_by');
    }
}