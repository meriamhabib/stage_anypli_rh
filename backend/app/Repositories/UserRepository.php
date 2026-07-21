<?php

namespace App\Repositories;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

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
     * Créer un compte employé
     */
    public function createEmployee(array $data)
    {

        // Générer un mot de passe temporaire
        $temporaryPassword = Str::random(10);


        $employee = $this->model->create([

            'last_name' => $data['last_name'],

            'first_name' => $data['first_name'],

            'email' => $data['email'],

            'phone' => $data['phone'] ?? null,

            'position' => $data['position'] ?? null,

            'hire_date' => $data['hire_date'] ?? null,


            // mot de passe crypté dans la BD
            'password' => Hash::make($temporaryPassword),


            // rôle employé
            'role' => 'employee'

        ]);


        return $employee;
    }
}
