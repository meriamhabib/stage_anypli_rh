<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LeaveRequest extends Model
{
    protected $table = 'leave_requests';

    protected $fillable = [
        'user_id',
        'start_date',
        'end_date',
        'reason',
        'medical_certificate',
        'status',
        'request_date',
        'processed_by',
        'comment',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }


    public function processedBy()
    {
        return $this->belongsTo(User::class, 'processed_by');
    }
}