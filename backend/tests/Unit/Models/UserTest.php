<?php

namespace Tests\Unit\Models;

use App\Models\Document;
use App\Models\DocumentDownload;
use App\Models\LeaveRequest;
use App\Models\News;
use App\Models\Task;
use App\Models\User;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class UserTest extends TestCase
{
    use RefreshDatabase;

    public function test_password_is_hashed_when_set(): void
    {
        $user = User::factory()->create(['password' => 'plain-text']);

        $this->assertNotSame('plain-text', $user->password);
        $this->assertTrue(Hash::check('plain-text', $user->password));
    }

    public function test_hire_date_is_cast_to_a_date(): void
    {
        $user = User::factory()->create(['hire_date' => '2024-01-15']);

        $this->assertInstanceOf(Carbon::class, $user->fresh()->hire_date);
    }

    public function test_password_and_remember_token_are_hidden(): void
    {
        $user = User::factory()->create();

        $array = $user->toArray();

        $this->assertArrayNotHasKey('password', $array);
        $this->assertArrayNotHasKey('remember_token', $array);
    }

    public function test_documents_relationship(): void
    {
        $user = User::factory()->create();
        Document::factory()->count(2)->create(['created_by' => $user->id]);

        $this->assertInstanceOf(Collection::class, $user->documents);
        $this->assertCount(2, $user->documents);
    }

    public function test_tasks_relationship(): void
    {
        $user = User::factory()->create();
        Task::factory()->count(3)->create(['user_id' => $user->id]);

        $this->assertCount(3, $user->tasks);
    }

    public function test_leave_requests_relationship(): void
    {
        $user = User::factory()->create();
        LeaveRequest::factory()->create(['user_id' => $user->id]);

        $this->assertCount(1, $user->leaveRequests);
    }

    public function test_treated_leave_requests_relationship(): void
    {
        $director = User::factory()->create(['role' => 'director']);
        LeaveRequest::factory()->create(['processed_by' => $director->id]);

        $this->assertCount(1, $director->treatedLeaveRequests);
    }

    public function test_news_relationship(): void
    {
        $user = User::factory()->create();
        News::factory()->count(2)->create(['created_by' => $user->id]);

        $this->assertCount(2, $user->news);
    }

    public function test_document_downloads_relationship(): void
    {
        $user = User::factory()->create();
        DocumentDownload::factory()->create(['user_id' => $user->id]);

        $this->assertCount(1, $user->documentDownloads);
    }
}
