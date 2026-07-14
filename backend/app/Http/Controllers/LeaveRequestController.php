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

            'start_date'=>'required|date',

            'end_date'=>'required|date|after_or_equal:start_date',

            'reason'=>'required|string',

            'medical_certificate'=>'nullable|string',

            'status'=>'nullable|in:pending,approved,rejected',

            'processed_by'=>'nullable|exists:users,id',

            'comment'=>'nullable|string',

        ]);



        $leave = $this->leaveRequestRepository->create(
            $request->all()
        );



        return response()->json([

            'message'=>'Leave request created',

            'data'=>$leave

        ],201);

    }




    public function show($id)
    {

        $leave = $this->leaveRequestRepository->getById($id);



        if(!$leave)
        {
            return response()->json([

                'message'=>'Leave request not found'

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

                'message'=>'Leave request not found'

            ],404);
        }



        $leave = $this->leaveRequestRepository->update(
            $leave,
            $request->all()
        );



        return response()->json([

            'message'=>'Leave request modified',

            'data'=>$leave

        ]);

    }





    public function destroy($id)
    {

        $leave = $this->leaveRequestRepository->getById($id);



        if(!$leave)
        {
            return response()->json([

                'message'=>'Leave request not found'

            ],404);
        }



        $this->leaveRequestRepository->delete($leave);



        return response()->json([

            'message'=>'Leave request deleted'

        ]);

    }

}