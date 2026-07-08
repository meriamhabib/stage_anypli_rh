<?php

namespace App\Repositories;

use App\Models\DocumentDownload;

class DocumentDownloadRepository
{

    public function getAll()
    {
        return DocumentDownload::with([
            'user',
            'document'
        ])->get();
    }



    public function getById($id)
    {
        return DocumentDownload::with([
            'user',
            'document'
        ])->find($id);
    }



    public function create(array $data)
    {
        return DocumentDownload::create($data);
    }



    public function delete(DocumentDownload $download)
    {
        return $download->delete();
    }

}