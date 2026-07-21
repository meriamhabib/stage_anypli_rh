<?php

namespace App\Repositories;

use App\Models\User;

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
    public function getEmployees()
    {
        return User::where('role', 'employee')->get();
    }
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