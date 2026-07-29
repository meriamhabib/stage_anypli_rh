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
        $data = $request->validate([
            'leave_type' => 'required|in:annual,sick,personal',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
            'reason' => 'required|string',
            'medical_certificate' => 'nullable|file|mimes:pdf,jpg,jpeg,png|max:5120',
        ]);

        // The owner and processing state are set server-side so an employee
        // cannot submit a request for someone else or self-approve it.
        $data['user_id'] = $request->user()->id;
        $data['status'] = 'pending';

        // Upload du certificat médical
        if ($request->hasFile('medical_certificate')) {
            $path = $request->file('medical_certificate')
                            ->store('certificates', 'public');
            $data['medical_certificate'] = $path;
        }

        $leave = $this->leaveRequestRepository->create($data);
        $leave->load(['user', 'processedBy']);

        return response()->json([
            'message' => 'Leave request created',
            'data' => $leave
        ], 201);
    }

    public function show($id)
    {
        $leave = $this->leaveRequestRepository->getById($id);

        if (!$leave) {
            return response()->json([
                'message' => 'Leave request not found'
            ], 404);
        }

        return response()->json($leave);
    }

    public function update(Request $request, $id)
    {
        $leave = $this->leaveRequestRepository->getById($id);

        if (!$leave) {
            return response()->json([
                'message' => 'Leave request not found'
            ], 404);
        }

        // Only validated processing fields are accepted; the processor is
        // recorded server-side so it cannot be spoofed.
        $data = $request->validate([
            'status' => 'sometimes|in:pending,approved,rejected',
            'comment' => 'nullable|string',
        ]);

        $data['processed_by'] = $request->user()->id;

        $leave = $this->leaveRequestRepository->update($leave, $data);
        $leave->load(['user', 'processedBy']);

        return response()->json([
            'message' => 'Leave request modified',
            'data' => $leave
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