<?php

namespace Tests\Unit\Repositories;

use App\Models\Task;
use App\Models\User;
use App\Repositories\TaskRepository;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class TaskRepositoryTest extends TestCase
{
    use RefreshDatabase;

    private TaskRepository $repository;

    protected function setUp(): void
    {
        parent::setUp();
        $this->repository = new TaskRepository(new Task);
    }

    public function test_get_all_eager_loads_user(): void
    {
        Task::factory()->count(2)->create();

        $tasks = $this->repository->getAll();

        $this->assertCount(2, $tasks);
        $this->assertTrue($tasks->first()->relationLoaded('user'));
    }

    public function test_get_by_id_returns_task_with_user(): void
    {
        $task = Task::factory()->create();

        $found = $this->repository->getById($task->id);

        $this->assertTrue($task->is($found));
        $this->assertTrue($found->relationLoaded('user'));
    }

    public function test_get_by_id_returns_null_when_missing(): void
    {
        $this->assertNull($this->repository->getById(999));
    }

    public function test_create_persists_a_task(): void
    {
        $user = User::factory()->create();

        $task = $this->repository->create([
            'user_id' => $user->id,
            'title' => 'Write tests',
            'priority' => 'high',
            'status' => 'to_do',
        ]);

        $this->assertInstanceOf(Task::class, $task);
        $this->assertDatabaseHas('tasks', ['title' => 'Write tests']);
    }

    public function test_update_modifies_existing_task(): void
    {
        $task = Task::factory()->create(['status' => 'to_do']);

        $updated = $this->repository->update($task->id, ['status' => 'completed']);

        $this->assertSame('completed', $updated->status);
        $this->assertDatabaseHas('tasks', ['id' => $task->id, 'status' => 'completed']);
    }

    public function test_update_returns_null_when_task_missing(): void
    {
        $this->assertNull($this->repository->update(999, ['status' => 'completed']));
    }

    public function test_delete_returns_true_and_removes_task(): void
    {
        $task = Task::factory()->create();

        $this->assertTrue($this->repository->delete($task->id));
        $this->assertDatabaseMissing('tasks', ['id' => $task->id]);
    }

    public function test_delete_returns_false_when_task_missing(): void
    {
        $this->assertFalse($this->repository->delete(999));
    }
}
