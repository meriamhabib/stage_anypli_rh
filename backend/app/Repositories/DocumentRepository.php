<?php

namespace App\Repositories;

use App\Models\Document;

class DocumentRepository extends BaseRepository
{
    protected array $relations = ['creator', 'downloads'];

    protected array $withCount = ['downloads'];

    public function __construct(Document $document)
    {
        $this->model = $document;
    }
}
