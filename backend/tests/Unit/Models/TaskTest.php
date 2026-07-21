<?php

namespace Tests\Unit\Models;

use App\Models\Task;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class TaskTest extends TestCase
{
    use RefreshDatabase;

    public function test_task_belongs_to_a_user(): void
    {
        $user = User::factory()->create();
        $task = Task::factory()->create(['user_id' => $user->id]);

        $this->assertTrue($user->is($task->user));
    }

    public function test_fillable_attributes_are_mass_assignable(): void
    {
        $user = User::factory()->create();

        $task = Task::create([
            'user_id' => $user->id,
            'title' => 'Ship it',
            'description' => 'Deliver the feature',
            'priority' => 'high',
            'status' => 'in_progress',
            'due_date' => '2024-12-31',
        ]);

        $this->assertSame('Ship it', $task->title);
        $this->assertSame('high', $task->priority);
        $this->assertSame('in_progress', $task->status);
    }
}
