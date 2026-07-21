<?php

namespace App\Repositories;

use App\Models\Task;

class TaskRepository extends BaseRepository
{
    protected array $relations = ['user'];

    public function __construct(Task $task)
    {
        $this->model = $task;
    }

    /**
     * Récupérer les tâches d'un utilisateur spécifique.
     */
    public function getByUserId($userId)
    {
        return $this->query()
            ->where('user_id', $userId)
            ->get();
    }

    /**
     * Update a task by id, returning null when it does not exist.
     */
    public function update($id, array $data)
    {
        $task = $this->model->find($id);

        if (!$task) {
            return null;
        }

        $task->update($data);

        return $task;
    }

    /**
     * Delete a task by id, returning false when it does not exist.
     */
    public function delete($id)
    {
        $task = $this->model->find($id);

        if (!$task) {
            return false;
        }

        $task->delete();

        return true;
    }
}
