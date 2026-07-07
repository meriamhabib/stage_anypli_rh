<?php

namespace App\Http\Controllers;

use App\Models\DocumentDownload;
use Illuminate\Http\Request;

class DocumentDownloadController extends Controller
{


    public function index()
    {
        return response()->json(
            DocumentDownload::with(['user','document'])->get()
        );
    }



    public function store(Request $request)
    {

        $request->validate([

            'user_id'=>'required|exists:users,id',

            'document_id'=>'required|exists:documents,id',

        ]);



        $download = DocumentDownload::create([

            'user_id'=>$request->user_id,

            'document_id'=>$request->document_id,

        ]);



        return response()->json([
            'message'=>'Téléchargement enregistré',
            'data'=>$download
        ],201);

    }




    public function show($id)
    {

        $download = DocumentDownload::with(['user','document'])
                    ->find($id);


        if(!$download)
        {
            return response()->json([
                'message'=>'Téléchargement introuvable'
            ],404);
        }


        return response()->json($download);
    }




    public function destroy($id)
    {

        $download = DocumentDownload::find($id);


        if(!$download)
        {
            return response()->json([
                'message'=>'Téléchargement introuvable'
            ],404);
        }


        $download->delete();


        return response()->json([
            'message'=>'Téléchargement supprimé'
        ]);

    }
}