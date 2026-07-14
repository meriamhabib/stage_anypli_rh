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

            'title'=>'required|string|max:255',

            'description'=>'nullable|string',

            'priority'=>'required|in:low,medium,high',

            'status'=>'required|in:to_do,in_progress,on_hold,completed',

            'due_date'=>'nullable|date',

        ]);



        $task = $this->repository->create(
            $request->all()
        );



        return response()->json([

            'message'=>'Task created successfully',

            'data'=>$task

        ],201);

    }





    public function show($id)
    {

        $task = $this->repository->getById($id);



        if(!$task)
        {
            return response()->json([

                'message'=>'Task not found'

            ],404);
        }



        return response()->json($task);

    }





    public function update(Request $request,$id)
    {


        $request->validate([

            'user_id'=>'required|exists:users,id',

            'title'=>'required|string|max:255',

            'description'=>'nullable|string',

            'priority'=>'required|in:low,medium,high',

            'status'=>'required|in:to_do,in_progress,on_hold,completed',

            'due_date'=>'nullable|date',

        ]);



        $task = $this->repository->update(
            $id,
            $request->all()
        );



        if(!$task)
        {
            return response()->json([

                'message'=>'Task not found'

            ],404);
        }



        return response()->json([

            'message'=>'Task modified',

            'data'=>$task

        ]);

    }





    public function destroy($id)
    {

        $deleted = $this->repository->delete($id);



        if(!$deleted)
        {
            return response()->json([

                'message'=>'Task not found'

            ],404);
        }



        return response()->json([

            'message'=>'Task deleted successfully'

        ]);

    }


}