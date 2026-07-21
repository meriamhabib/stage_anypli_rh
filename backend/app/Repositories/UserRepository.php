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

    public function getDirectors()
    {
        return User::whereIn('role', ['director', 'directeur'])->get();
    }

}