<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Repositories\NewsRepository;

class NewsController extends Controller
{

    protected $newsRepository;



    public function __construct(NewsRepository $newsRepository)
    {
        $this->newsRepository = $newsRepository;
    }



    /**
     * Afficher toutes les actualités
     */
    public function index()
    {

        $news = $this->newsRepository->getAll();


        return response()->json($news);

    }




    /**
     * Créer une actualité
     */
    public function store(Request $request)
    {

        $request->validate([

            'title'=>'required|string|max:255',

            'description'=>'required|string',

            'image'=>'nullable|string|max:255',

            'publication_date'=>'required|date',

            'created_by'=>'required|exists:users,id',

        ]);



        $news = $this->newsRepository->create(
            $request->all()
        );



        return response()->json([

            'message'=>'News created successfully',

            'data'=>$news

        ],201);

    }





    /**
     * Afficher une actualité
     */
    public function show($id)
    {

        $news = $this->newsRepository->getById($id);



        if(!$news)
        {

            return response()->json([

                'message'=>'News not found'

            ],404);

        }



        return response()->json($news);

    }





    /**
     * Modifier une actualité
     */
    public function update(Request $request,$id)
    {

        $news = $this->newsRepository->getById($id);



        if(!$news)
        {

            return response()->json([

                'message'=>'News not found'

            ],404);

        }



        $request->validate([

            'title'=>'required|string|max:255',

            'description'=>'required|string',

            'image'=>'nullable|string|max:255',

            'publication_date'=>'required|date',

        ]);



        $news = $this->newsRepository->update(

            $news,

            $request->all()

        );



        return response()->json([

            'message'=>'News modified',

            'data'=>$news

        ]);

    }





    /**
     * Supprimer une actualité
     */
    public function destroy($id)
    {

        $news = $this->newsRepository->getById($id);



        if(!$news)
        {

            return response()->json([

                'message'=>'News not found'

            ],404);

        }



        $this->newsRepository->delete($news);



        return response()->json([

            'message'=>'News deleted'

        ]);

    }

}