<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class News extends Model
{
    protected $table = 'news';

    protected $fillable = [
        'titre',
        'description',
        'image',
        'date_publication',
        'created_by',
    ];


    public function auteur()
    {
        return $this->belongsTo(User::class, 'created_by');
    }
}