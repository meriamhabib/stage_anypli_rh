<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Concerns\ApiResponse;
use App\Repositories\DocumentDownloadRepository;

class DocumentDownloadController extends Controller
{
    use ApiResponse;

    protected $documentDownloadRepository;

    public function __construct(DocumentDownloadRepository $documentDownloadRepository)
    {
        $this->documentDownloadRepository = $documentDownloadRepository;
    }

    /**
     * Afficher tous les téléchargements
     */
    public function index()
    {
        return response()->json($this->documentDownloadRepository->getAll());
    }

    /**
     * Enregistrer un téléchargement
     */
    public function store(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'document_id' => 'required|exists:documents,id',
        ]);

        $download = $this->documentDownloadRepository->create([
            'user_id' => $request->user_id,
            'document_id' => $request->document_id,
        ]);

        return $this->createdResponse($download, 'Download recorded');
    }

    /**
     * Afficher un téléchargement
     */
    public function show($id)
    {
        $download = $this->documentDownloadRepository->getById($id);

        if (!$download) {
            return $this->notFoundResponse('Download not found');
        }

        return response()->json($download);
    }

    /**
     * Supprimer un téléchargement
     */
    public function destroy($id)
    {
        $download = $this->documentDownloadRepository->getById($id);

        if (!$download) {
            return $this->notFoundResponse('Download not found');
        }

        $this->documentDownloadRepository->delete($download);

        return $this->messageResponse('Download deleted');
    }
}
