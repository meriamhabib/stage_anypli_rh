<?php

namespace App\Repositories;

use App\Models\LeaveRequest;

class LeaveRequestRepository
{

    /**
     * Récupérer toutes les demandes de congé
     */
    public function getAll()
    {
        return LeaveRequest::with([
            'user',
            'processedBy'
        ])->get();
    }



    /**
     * Trouver une demande par id
     */
    public function getById($id)
    {
        return LeaveRequest::with([
            'user',
            'processedBy'
        ])->find($id);
    }



    /**
     * Créer une demande
     */
    public function create(array $data)
    {
        return LeaveRequest::create($data);
    }



    /**
     * Modifier une demande
     */
    public function update(LeaveRequest $leave, array $data)
    {
        $leave->update($data);

        return $leave;
    }



    /**
     * Supprimer une demande
     */
    public function delete(LeaveRequest $leave)
    {
        return $leave->delete();
    }

}