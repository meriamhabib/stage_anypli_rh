<?php

namespace Tests\Unit\Models;

use App\Models\LeaveRequest;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class LeaveRequestTest extends TestCase
{
    use RefreshDatabase;

    public function test_leave_request_belongs_to_the_requesting_user(): void
    {
        $user = User::factory()->create();
        $leave = LeaveRequest::factory()->create(['user_id' => $user->id]);

        $this->assertTrue($user->is($leave->user));
    }

    public function test_leave_request_belongs_to_the_processing_director(): void
    {
        $director = User::factory()->create(['role' => 'director']);
        $leave = LeaveRequest::factory()->create(['processed_by' => $director->id]);

        $this->assertTrue($director->is($leave->processedBy));
    }

    public function test_processed_by_is_null_by_default(): void
    {
        $leave = LeaveRequest::factory()->create();

        $this->assertNull($leave->processedBy);
    }

    public function test_fillable_attributes_are_mass_assignable(): void
    {
        $user = User::factory()->create();

        $leave = LeaveRequest::create([
            'user_id' => $user->id,
            'leave_type' => 'annual',
            'start_date' => '2024-06-01',
            'end_date' => '2024-06-10',
            'reason' => 'Holiday',
            'status' => 'pending',
        ]);

        $this->assertSame('Holiday', $leave->reason);
        $this->assertSame('annual', $leave->leave_type);
        $this->assertSame('pending', $leave->status);
    }
}
