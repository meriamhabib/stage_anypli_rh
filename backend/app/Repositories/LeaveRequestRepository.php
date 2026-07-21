<?php

namespace App\Repositories;

use App\Models\LeaveRequest;

class LeaveRequestRepository extends BaseRepository
{
    protected array $relations = ['user', 'processedBy'];

    public function __construct(LeaveRequest $leaveRequest)
    {
        $this->model = $leaveRequest;
    }
}
