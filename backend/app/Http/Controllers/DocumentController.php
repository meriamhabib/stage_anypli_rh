<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Concerns\ApiResponse;
use App\Repositories\DocumentRepository;

class DocumentController extends Controller
{
    use ApiResponse;

    protected $documentRepository;

    /**
     * Injection du Repository
     */
    public function __construct(DocumentRepository $documentRepository)
    {
        $this->documentRepository = $documentRepository;
    }

    /**
     * Afficher tous les documents
     */
    public function index()
    {
        return response()->json($this->documentRepository->getAll());
    }

    /**
     * Enregistrer un nouveau document
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'file_path' => 'required|string|max:255',
            'document_type' => 'required|string|max:100',
            'created_by' => 'required|exists:users,id',
        ]);

        $document = $this->documentRepository->create([
            'title' => $request->title,
            'description' => $request->description,
            'file_path' => $request->file_path,
            'document_type' => $request->document_type,
            'created_by' => $request->created_by,
        ]);

        return $this->createdResponse($document, 'Document created successfully.', 'document');
    }

    /**
     * Afficher un document
     */
    public function show($id)
    {
        $document = $this->documentRepository->getById($id);

        if (!$document) {
            return $this->notFoundResponse('Document not found.');
        }

        return response()->json($document);
    }

    /**
     * Modifier un document
     */
    public function update(Request $request, $id)
    {
        $document = $this->documentRepository->getById($id);

        if (!$document) {
            return $this->notFoundResponse('Document not found.');
        }

        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'file_path' => 'required|string|max:255',
            'document_type' => 'required|string|max:100',
        ]);

        $document = $this->documentRepository->update($document, [
            'title' => $request->title,
            'description' => $request->description,
            'file_path' => $request->file_path,
            'document_type' => $request->document_type,
        ]);

        return $this->successResponse($document, 'Document updated successfully.', 200, 'document');
    }

    /**
     * Supprimer un document
     */
    public function destroy($id)
    {
        $document = $this->documentRepository->getById($id);

        if (!$document) {
            return $this->notFoundResponse('Document not found.');
        }

        $this->documentRepository->delete($document);

        return $this->messageResponse('Document deleted successfully.');
    }
}
