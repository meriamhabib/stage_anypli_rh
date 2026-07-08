<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Repositories\TaskRepository;


class TaskController extends Controller
{


    protected $repository;



    public function __construct(TaskRepository $repository)
    {
        $this->repository = $repository;
    }




    public function index()
    {

        return response()->json(
            $this->repository->getAll()
        );

    }





    public function store(Request $request)
    {

        $request->validate([

            'user_id'=>'required|exists:users,id',

            'titre'=>'required|string|max:255',

            'description'=>'nullable|string',

            'priorite'=>'required|in:basse,moyenne,haute',

            'statut'=>'required|in:a_faire,en_cours,en_pause,termine',

            'date_echeance'=>'nullable|date',

        ]);



        $task = $this->repository->create(
            $request->all()
        );



        return response()->json([

            'message'=>'Tâche créée avec succès',

            'data'=>$task

        ],201);

    }





    public function show($id)
    {

        $task = $this->repository->getById($id);



        if(!$task)
        {
            return response()->json([

                'message'=>'Tâche introuvable'

            ],404);
        }



        return response()->json($task);

    }





    public function update(Request $request,$id)
    {


        $request->validate([

            'user_id'=>'required|exists:users,id',

            'titre'=>'required|string|max:255',

            'description'=>'nullable|string',

            'priorite'=>'required|in:basse,moyenne,haute',

            'statut'=>'required|in:a_faire,en_cours,en_pause,termine',

            'date_echeance'=>'nullable|date',

        ]);



        $task = $this->repository->update(
            $id,
            $request->all()
        );



        if(!$task)
        {
            return response()->json([

                'message'=>'Tâche introuvable'

            ],404);
        }



        return response()->json([

            'message'=>'Tâche modifiée',

            'data'=>$task

        ]);

    }





    public function destroy($id)
    {

        $deleted = $this->repository->delete($id);



        if(!$deleted)
        {
            return response()->json([

                'message'=>'Tâche introuvable'

            ],404);
        }



        return response()->json([

            'message'=>'Tâche supprimée avec succès'

        ]);

    }


}