<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Repositories\DocumentDownloadRepository;

class DocumentDownloadController extends Controller
{

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
        $downloads = $this->documentDownloadRepository->getAll();

        return response()->json($downloads);
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



        return response()->json([

            'message' => 'Téléchargement enregistré',

            'data' => $download

        ], 201);

    }




    /**
     * Afficher un téléchargement
     */
    public function show($id)
    {

        $download = $this->documentDownloadRepository->getById($id);



        if(!$download)
        {

            return response()->json([

                'message' => 'Téléchargement introuvable'

            ],404);

        }



        return response()->json($download);

    }




    /**
     * Supprimer un téléchargement
     */
    public function destroy($id)
    {

        $download = $this->documentDownloadRepository->getById($id);



        if(!$download)
        {

            return response()->json([

                'message' => 'Téléchargement introuvable'

            ],404);

        }



        $this->documentDownloadRepository->delete($download);



        return response()->json([

            'message' => 'Téléchargement supprimé'

        ]);

    }

}