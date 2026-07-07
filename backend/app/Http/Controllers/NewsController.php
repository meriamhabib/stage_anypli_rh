<?php

namespace App\Http\Controllers;

use App\Models\News;
use Illuminate\Http\Request;

class NewsController extends Controller
{

    public function index()
    {
        return response()->json(
            News::with('auteur')->get()
        );
    }


    public function store(Request $request)
    {

        $request->validate([

            'titre'=>'required|string|max:255',

            'description'=>'required|string',

            'image'=>'nullable|string|max:255',

            'date_publication'=>'required|date',

            'created_by'=>'required|exists:users,id',

        ]);


        $news = News::create($request->all());


        return response()->json([
            'message'=>'Actualité créée avec succès',
            'data'=>$news
        ],201);
    }



    public function show($id)
    {

        $news = News::with('auteur')->find($id);


        if(!$news)
        {
            return response()->json([
                'message'=>'Actualité introuvable'
            ],404);
        }


        return response()->json($news);
    }



    public function update(Request $request,$id)
    {

        $news = News::find($id);


        if(!$news)
        {
            return response()->json([
                'message'=>'Actualité introuvable'
            ],404);
        }


        $request->validate([

            'titre'=>'required|string|max:255',

            'description'=>'required|string',

            'image'=>'nullable|string|max:255',

            'date_publication'=>'required|date',

        ]);


        $news->update($request->all());


        return response()->json([
            'message'=>'Actualité modifiée',
            'data'=>$news
        ]);
    }



    public function destroy($id)
    {

        $news = News::find($id);


        if(!$news)
        {
            return response()->json([
                'message'=>'Actualité introuvable'
            ],404);
        }


        $news->delete();


        return response()->json([
            'message'=>'Actualité supprimée'
        ]);
    }
}