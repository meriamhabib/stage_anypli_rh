<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    public function index()
    {
        return response()->json(
            Task::with('user')->get()
        );
    }

    public function store(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'titre' => 'required|string|max:255',
            'description' => 'nullable|string',
            'priorite' => 'required|in:basse,moyenne,haute',
            'statut' => 'required|in:a_faire,en_cours,en_pause,termine',
            'date_echeance' => 'nullable|date',
        ]);

        $task = Task::create($request->all());

        return response()->json($task,201);
    }

    public function show($id)
    {
        $task = Task::with('user')->find($id);

        if(!$task){
            return response()->json([
                'message'=>'Tâche introuvable'
            ],404);
        }

        return response()->json($task);
    }

    public function update(Request $request,$id)
    {
        $task = Task::find($id);

        if(!$task){
            return response()->json([
                'message'=>'Tâche introuvable'
            ],404);
        }

        $request->validate([
            'user_id'=>'required|exists:users,id',
            'titre'=>'required|string|max:255',
            'description'=>'nullable|string',
            'priorite'=>'required|in:basse,moyenne,haute',
            'statut'=>'required|in:a_faire,en_cours,en_pause,termine',
            'date_echeance'=>'nullable|date',
        ]);

        $task->update($request->all());

        return response()->json($task);
    }

    public function destroy($id)
    {
        $task = Task::find($id);

        if(!$task){
            return response()->json([
                'message'=>'Tâche introuvable'
            ],404);
        }

        $task->delete();

        return response()->json([
            'message'=>'Tâche supprimée avec succès'
        ]);
    }
}