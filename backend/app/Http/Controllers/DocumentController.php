<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Repositories\DocumentRepository;
use App\Repositories\DocumentDownloadRepository;

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
     * Créer un nouveau document
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'file' => 'required|file|mimes:pdf,doc,docx,xlsx,ppt,pptx,txt|max:51200',
            'document_type' => 'required|string|max:100',
        ]);

        $user = $request->user();

        // Stocker le fichier
        $path = $request->file('file')->store('documents', 'public');

        $document = $this->documentRepository->create([
            'title' => $request->title,
            'description' => $request->description,
            'file_path' => $path,
            'original_name' => $request->file('file')->getClientOriginalName(),
            'document_type' => $request->document_type,
            'created_by' => $user->id,
        ]);

        return response()->json([
            'message' => 'Document created successfully.',
            'document' => $document,
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
                'message' => 'Document not found.',
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
                'message' => 'Document not found.',
            ], 404);
        }

        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'file' => 'nullable|file|mimes:pdf,doc,docx,xlsx,ppt,pptx,txt|max:51200',
            'document_type' => 'required|string|max:100',
        ]);

        $data = [
            'title' => $request->title,
            'description' => $request->description,
            'document_type' => $request->document_type,
        ];

        // Si un nouveau fichier est envoyé
        if ($request->hasFile('file')) {

            // Supprimer l'ancien fichier
            if (
                $document->file_path &&
                Storage::disk('public')->exists($document->file_path)
            ) {
                Storage::disk('public')->delete($document->file_path);
            }

            // Enregistrer le nouveau fichier
            $newPath = $request->file('file')->store('documents', 'public');

            $data['file_path'] = $newPath;
            $data['original_name'] = $request->file('file')->getClientOriginalName();
        }

        $document = $this->documentRepository->update($document, $data);

        return response()->json([
            'message' => 'Document updated successfully.',
            'document' => $document,
        ]);
    }

    /**
     * Télécharger un document
     */
    public function download(
        Request $request,
        $id,
        DocumentDownloadRepository $documentDownloadRepository
    ) {
        $document = $this->documentRepository->getById($id);

        if (!$document) {
            return response()->json([
                'message' => 'Document not found.',
            ], 404);
        }

        if (!Storage::disk('public')->exists($document->file_path)) {
            return response()->json([
                'message' => 'File not found on server.',
            ], 404);
        }

        // Enregistrer le téléchargement
        $documentDownloadRepository->create([
            'user_id' => $request->user()->id,
            'document_id' => $document->id,
            'downloaded_at' => now(),
        ]);

        // Télécharger avec le nom original
        return Storage::disk('public')->download(
            $document->file_path,
            $document->original_name
        );
    }

    /**
     * Supprimer un document
     */
    public function destroy($id)
    {
        $document = $this->documentRepository->getById($id);

        if (!$document) {
            return response()->json([
                'message' => 'Document not found.',
            ], 404);
        }

        // Supprimer le fichier physique
        if (
            $document->file_path &&
            Storage::disk('public')->exists($document->file_path)
        ) {
            Storage::disk('public')->delete($document->file_path);
        }

        // Supprimer l'enregistrement
        $this->documentRepository->delete($document);

        return response()->json([
            'message' => 'Document deleted successfully.',
        ]);
    }
}