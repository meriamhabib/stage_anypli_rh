<?php

namespace App\Http\Controllers;

use App\Models\LeaveRequest;
use Illuminate\Http\Request;

class LeaveRequestController extends Controller
{

    public function index()
    {
        return response()->json(
            LeaveRequest::with(['user','directeur'])->get()
        );
    }


    public function store(Request $request)
    {
        $request->validate([

            'user_id'=>'required|exists:users,id',

            'date_debut'=>'required|date',

            'date_fin'=>'required|date|after_or_equal:date_debut',

            'motif'=>'required|string',

            'certificat'=>'nullable|string',

            'statut'=>'nullable|in:en_attente,acceptee,rejetee',

            'traite_par'=>'nullable|exists:users,id',

            'commentaire'=>'nullable|string',

        ]);


        $leave = LeaveRequest::create($request->all());


        return response()->json([
            'message'=>'Demande de congé créée',
            'data'=>$leave
        ],201);
    }



    public function show($id)
    {
        $leave = LeaveRequest::with(['user','directeur'])
                    ->find($id);


        if(!$leave)
        {
            return response()->json([
                'message'=>'Demande introuvable'
            ],404);
        }


        return response()->json($leave);
    }



    public function update(Request $request,$id)
    {

        $leave = LeaveRequest::find($id);


        if(!$leave)
        {
            return response()->json([
                'message'=>'Demande introuvable'
            ],404);
        }


        $leave->update($request->all());


        return response()->json([
            'message'=>'Demande modifiée',
            'data'=>$leave
        ]);

    }



    public function destroy($id)
    {

        $leave = LeaveRequest::find($id);


        if(!$leave)
        {
            return response()->json([
                'message'=>'Demande introuvable'
            ],404);
        }


        $leave->delete();


        return response()->json([
            'message'=>'Demande supprimée'
        ]);

    }
}