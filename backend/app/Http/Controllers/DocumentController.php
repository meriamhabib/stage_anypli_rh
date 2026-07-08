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
            'titre' => 'required|string|max:255',
            'description' => 'nullable|string',
            'chemin_fichier' => 'required|string|max:255',
            'type_document' => 'required|string|max:100',
            'created_by' => 'required|exists:users,id',
        ]);

        $document = $this->documentRepository->create([
            'titre' => $request->titre,
            'description' => $request->description,
            'chemin_fichier' => $request->chemin_fichier,
            'type_document' => $request->type_document,
            'created_by' => $request->created_by,
        ]);

        return response()->json([
            'message' => 'Document créé avec succès.',
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
                'message' => 'Document introuvable.'
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
                'message' => 'Document introuvable.'
            ], 404);
        }

        $request->validate([
            'titre' => 'required|string|max:255',
            'description' => 'nullable|string',
            'chemin_fichier' => 'required|string|max:255',
            'type_document' => 'required|string|max:100',
        ]);

        $document = $this->documentRepository->update($document, [
            'titre' => $request->titre,
            'description' => $request->description,
            'chemin_fichier' => $request->chemin_fichier,
            'type_document' => $request->type_document,
        ]);

        return response()->json([
            'message' => 'Document mis à jour avec succès.',
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
                'message' => 'Document introuvable.'
            ], 404);
        }

        $this->documentRepository->delete($document);

        return response()->json([
            'message' => 'Document supprimé avec succès.'
        ]);
    }
}