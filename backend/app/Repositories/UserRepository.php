<?php

namespace App\Repositories;

use App\Models\User;

class UserRepository extends BaseRepository
{
    public function __construct(User $user)
    {
        $this->model = $user;
    }

    /**
     * Trouver un utilisateur par email
     */
    public function findByEmail($email)
    {
        return $this->model->where('email', $email)->first();
    }


    /**
     * Trouver par ID
     */
    public function findById($id)
    {
        return $this->model->find($id);
    }


    /**
     * Retourner tous les employés
     */
    public function getEmployees()
    {
        return $this->model->where('role', 'employee')->get();
    }



    /**
     * Trouver un employé
     */
    public function findEmployee($id)
    {
        return $this->model->where('role', 'employee')
                    ->findOrFail($id);
    }


    /**
     * Retourner tous les directeurs
     */
    public function getDirectors()
    {
        return $this->model->whereIn('role', ['director', 'directeur'])->get();
    }
}
