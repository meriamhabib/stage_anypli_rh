<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Repositories\DocumentRepository;

class DocumentController extends Controller
{
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
        $documents = $this->documentRepository->getAll();

        return response()->json($documents);
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
        ]);

        $document = $this->documentRepository->create([
            'title' => $request->title,
            'description' => $request->description,
            'file_path' => $request->file_path,
            'document_type' => $request->document_type,
            'created_by' => $request->user()->id,
        ]);

        return response()->json([
            'message' => 'Document created successfully.',
            'document' => $document
        ], 201);
    }

    /**
     * Afficher un document
     */
    public function show($id)
    {
        $document = $this->documentRepository->getById($id);

        if (!$document) {
            return response()->json([
                'message' => 'Document not found.'
            ], 404);
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
            return response()->json([
                'message' => 'Document not found.'
            ], 404);
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

        return response()->json([
            'message' => 'Document updated successfully.',
            'document' => $document
        ]);
    }

    /**
     * Supprimer un document
     */
    public function destroy($id)
    {
        $document = $this->documentRepository->getById($id);

        if (!$document) {
            return response()->json([
                'message' => 'Document not found.'
            ], 404);
        }

        $this->documentRepository->delete($document);

        return response()->json([
            'message' => 'Document deleted successfully.'
        ]);
    }
}