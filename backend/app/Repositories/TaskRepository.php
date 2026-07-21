<?php

namespace App\Repositories;

use App\Models\Task;

class TaskRepository
{

    protected $model;


    public function __construct(Task $task)
    {
        $this->model = $task;
    }



    // récupérer toutes les tâches
    public function getAll()
    {
        return $this->model
                    ->with('user')
                    ->get();
    }

    // récupérer les tâches d'un utilisateur spécifique
    public function getByUserId($userId)
    {
        return $this->model
                    ->with('user')
                    ->where('user_id', $userId)
                    ->get();
    }




    // récupérer une tâche par id
    public function getById($id)
    {
        return $this->model
                    ->with('user')
                    ->find($id);
    }




    // créer une tâche
    public function create(array $data)
    {
        return $this->model->create($data);
    }




    // modifier une tâche
    public function update($id, array $data)
    {

        $task = $this->model->find($id);


        if(!$task)
        {
            return null;
        }


        $task->update($data);


        return $task;
    }




    // supprimer une tâche
    public function delete($id)
    {

        $task = $this->model->find($id);


        if(!$task)
        {
            return false;
        }


        $task->delete();


        return true;
    }

}