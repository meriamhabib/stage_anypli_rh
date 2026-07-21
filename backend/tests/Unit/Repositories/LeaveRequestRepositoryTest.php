<?php

namespace Tests\Unit\Repositories;

use App\Models\LeaveRequest;
use App\Models\User;
use App\Repositories\LeaveRequestRepository;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class LeaveRequestRepositoryTest extends TestCase
{
    use RefreshDatabase;

    private LeaveRequestRepository $repository;

    protected function setUp(): void
    {
        parent::setUp();
        $this->repository = new LeaveRequestRepository;
    }

    public function test_get_all_eager_loads_user_and_processed_by(): void
    {
        LeaveRequest::factory()->count(2)->create();

        $leaves = $this->repository->getAll();

        $this->assertCount(2, $leaves);
        $this->assertTrue($leaves->first()->relationLoaded('user'));
        $this->assertTrue($leaves->first()->relationLoaded('processedBy'));
    }

    public function test_get_by_id_returns_leave_with_relations(): void
    {
        $leave = LeaveRequest::factory()->create();

        $found = $this->repository->getById($leave->id);

        $this->assertTrue($leave->is($found));
        $this->assertTrue($found->relationLoaded('user'));
    }

    public function test_get_by_id_returns_null_when_missing(): void
    {
        $this->assertNull($this->repository->getById(999));
    }

    public function test_create_persists_a_leave_request(): void
    {
        $user = User::factory()->create();

        $leave = $this->repository->create([
            'user_id' => $user->id,
            'start_date' => '2024-06-01',
            'end_date' => '2024-06-05',
            'reason' => 'Vacation',
            'status' => 'pending',
        ]);

        $this->assertInstanceOf(LeaveRequest::class, $leave);
        $this->assertDatabaseHas('leave_requests', ['reason' => 'Vacation']);
    }

    public function test_update_modifies_and_returns_the_leave_request(): void
    {
        $leave = LeaveRequest::factory()->create(['status' => 'pending']);
        $director = User::factory()->create(['role' => 'director']);

        $updated = $this->repository->update($leave, [
            'status' => 'approved',
            'processed_by' => $director->id,
        ]);

        $this->assertSame('approved', $updated->status);
        $this->assertDatabaseHas('leave_requests', [
            'id' => $leave->id,
            'status' => 'approved',
            'processed_by' => $director->id,
        ]);
    }

    public function test_delete_removes_the_leave_request(): void
    {
        $leave = LeaveRequest::factory()->create();

        $this->repository->delete($leave);

        $this->assertDatabaseMissing('leave_requests', ['id' => $leave->id]);
    }
}
