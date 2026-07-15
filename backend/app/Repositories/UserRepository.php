<?php

namespace App\Repositories;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UserRepository
{

    /**
     * Créer un utilisateur
     */
    public function create(array $data)
    {
        return User::create($data);
    }


    /**
     * Trouver un utilisateur par email
     */
    public function findByEmail($email)
    {
        return User::where('email',$email)->first();
    }


    /**
     * Trouver par ID
     */
    public function findById($id)
    {
        return User::find($id);
    }


    /**
     * Retourner tous les utilisateurs
     */
    public function getAll()
    {
        return User::all();
    }


    /**
     * Modifier utilisateur
     */
    public function update(User $user,array $data)
    {
        $user->update($data);

        return $user;
    }


    /**
     * Supprimer utilisateur
     */
    public function delete(User $user)
    {
        return $user->delete();
    }


    /**
     * Retourner tous les employés
     */
    public function getEmployees()
    {
        return User::where('role', 'employee')->get();
    }



    /**
     * Trouver un employé
     */
    public function findEmployee($id)
    {
        return User::where('role', 'employee')
                    ->findOrFail($id);
    }



    /**
     * Créer un compte employé
     */
    public function createEmployee(array $data)
    {

        // Générer un mot de passe temporaire
        $temporaryPassword = Str::random(10);


        $employee = User::create([

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