<?php

namespace App\Repositories;

use App\Models\DocumentDownload;

class DocumentDownloadRepository extends BaseRepository
{
    protected array $relations = ['user', 'document'];

    public function __construct(DocumentDownload $documentDownload)
    {
        $this->model = $documentDownload;
    }
}
