<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Repositories\LeaveRequestRepository;

class LeaveRequestController extends Controller
{

    protected $leaveRequestRepository;



    public function __construct(LeaveRequestRepository $leaveRequestRepository)
    {
        $this->leaveRequestRepository = $leaveRequestRepository;
    }



    public function index()
    {
        $leaves = $this->leaveRequestRepository->getAll();

        return response()->json($leaves);
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



        $leave = $this->leaveRequestRepository->create(
            $request->all()
        );



        return response()->json([

            'message'=>'Demande de congé créée',

            'data'=>$leave

        ],201);

    }




    public function show($id)
    {

        $leave = $this->leaveRequestRepository->getById($id);



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

        $leave = $this->leaveRequestRepository->getById($id);



        if(!$leave)
        {
            return response()->json([

                'message'=>'Demande introuvable'

            ],404);
        }



        $leave = $this->leaveRequestRepository->update(
            $leave,
            $request->all()
        );



        return response()->json([

            'message'=>'Demande modifiée',

            'data'=>$leave

        ]);

    }





    public function destroy($id)
    {

        $leave = $this->leaveRequestRepository->getById($id);



        if(!$leave)
        {
            return response()->json([

                'message'=>'Demande introuvable'

            ],404);
        }



        $this->leaveRequestRepository->delete($leave);



        return response()->json([

            'message'=>'Demande supprimée'

        ]);

    }

}