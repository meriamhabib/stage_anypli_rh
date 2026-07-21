<?php

namespace App\Repositories;

use App\Models\Document;

class DocumentRepository extends BaseRepository
{
    protected array $relations = ['creator'];

    public function __construct(Document $document)
    {
        $this->model = $document;
    }
}
