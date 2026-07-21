<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Concerns\ApiResponse;
use App\Repositories\LeaveRequestRepository;

class LeaveRequestController extends Controller
{
    use ApiResponse;

    protected $leaveRequestRepository;

    public function __construct(LeaveRequestRepository $leaveRequestRepository)
    {
        $this->leaveRequestRepository = $leaveRequestRepository;
    }

    public function index()
    {
        return response()->json($this->leaveRequestRepository->getAll());
    }

    public function store(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
            'reason' => 'required|string',
            'medical_certificate' => 'nullable|string',
            'status' => 'nullable|in:pending,approved,rejected',
            'processed_by' => 'nullable|exists:users,id',
            'comment' => 'nullable|string',
        ]);

        $leave = $this->leaveRequestRepository->create($request->all());

        return $this->createdResponse($leave, 'Leave request created');
    }

    public function show($id)
    {
        $leave = $this->leaveRequestRepository->getById($id);

        if (!$leave) {
            return $this->notFoundResponse('Leave request not found');
        }

        return response()->json($leave);
    }

    public function update(Request $request, $id)
    {
        $leave = $this->leaveRequestRepository->getById($id);

        if (!$leave) {
            return $this->notFoundResponse('Leave request not found');
        }

        $leave = $this->leaveRequestRepository->update($leave, $request->all());

        return $this->successResponse($leave, 'Leave request modified');
    }

    public function destroy($id)
    {
        $leave = $this->leaveRequestRepository->getById($id);

        if (!$leave) {
            return $this->notFoundResponse('Leave request not found');
        }

        $this->leaveRequestRepository->delete($leave);

        return $this->messageResponse('Leave request deleted');
    }
}
