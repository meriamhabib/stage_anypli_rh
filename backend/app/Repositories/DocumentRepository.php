<?php

namespace App\Repositories;

use App\Models\Document;

class DocumentRepository
{
    public function getAll()
    {
        return Document::with([
            'creator',
            'downloads'
        ])
        ->withCount('downloads')
        ->get();
    }

    public function getById($id)
    {
        return Document::with([
            'creator',
            'downloads'
        ])
        ->withCount('downloads')
        ->find($id);
    }

    public function create(array $data)
    {
        return Document::create($data);
    }

    public function update(Document $document, array $data)
    {
        $document->update($data);

        return $document;
    }

    public function delete(Document $document)
    {
        return $document->delete();
    }
}