<?php

namespace App\Repositories;

use App\Models\Document;

class DocumentRepository
{
    /**
     * Retourner tous les documents
     */
    public function getAll()
    {
        return Document::with('auteur')->get();
    }

    /**
     * Retourner un document par son id
     */
    public function getById($id)
    {
        return Document::with('auteur')->find($id);
    }

    /**
     * Créer un document
     */
    public function create(array $data)
    {
        return Document::create($data);
    }

    /**
     * Modifier un document
     */
    public function update(Document $document, array $data)
    {
        $document->update($data);

        return $document;
    }

    /**
     * Supprimer un document
     */
    public function delete(Document $document)
    {
        return $document->delete();
    }
}