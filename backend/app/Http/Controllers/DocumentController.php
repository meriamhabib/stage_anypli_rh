<?php

namespace App\Http\Controllers;

use App\Models\Document;
use Illuminate\Http\Request;

class DocumentController extends Controller
{
    /**
     * Afficher tous les documents
     */
    public function index()
    {
        $documents = Document::with('auteur')->get();

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

        $document = Document::create([
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
        $document = Document::with('auteur')->find($id);

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
        $document = Document::find($id);

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

        $document->update([
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
        $document = Document::find($id);

        if (!$document) {
            return response()->json([
                'message' => 'Document introuvable.'
            ], 404);
        }

        $document->delete();

        return response()->json([
            'message' => 'Document supprimé avec succès.'
        ]);
    }
}