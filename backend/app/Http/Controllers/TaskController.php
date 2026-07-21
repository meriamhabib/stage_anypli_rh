<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Concerns\ApiResponse;
use App\Repositories\TaskRepository;

class TaskController extends Controller
{
    use ApiResponse;

    protected $repository;

    public function __construct(TaskRepository $repository)
    {
        $this->repository = $repository;
    }

    public function index()
    {
        return response()->json($this->repository->getAll());
    }

    public function store(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'priority' => 'required|in:low,medium,high',
            'status' => 'required|in:to_do,in_progress,on_hold,completed',
            'due_date' => 'nullable|date',
        ]);

        $task = $this->repository->create($request->all());

        return $this->createdResponse($task, 'Task created successfully');
    }

    public function show($id)
    {
        $task = $this->repository->getById($id);

        if (!$task) {
            return $this->notFoundResponse('Task not found');
        }

        return response()->json($task);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'priority' => 'required|in:low,medium,high',
            'status' => 'required|in:to_do,in_progress,on_hold,completed',
            'due_date' => 'nullable|date',
        ]);

        $task = $this->repository->update($id, $request->all());

        if (!$task) {
            return $this->notFoundResponse('Task not found');
        }

        return $this->successResponse($task, 'Task modified');
    }

    public function destroy($id)
    {
        $deleted = $this->repository->delete($id);

        if (!$deleted) {
            return $this->notFoundResponse('Task not found');
        }

        return $this->messageResponse('Task deleted successfully');
    }
}
