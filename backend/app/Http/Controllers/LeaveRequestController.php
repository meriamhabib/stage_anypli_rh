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
            'user_id' => 'sometimes|exists:users,id',
            'leave_type' => 'required|in:annual,sick,personal',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
            'reason' => 'required|string',
            'medical_certificate' => 'nullable|file|mimes:pdf,jpg,jpeg,png|max:5120',
            'processed_by' => 'nullable|exists:users,id',
        ]);

        $data = $request->all();

        if (empty($data['user_id']) && $request->user()) {
            $data['user_id'] = $request->user()->id;
        }

        // Upload du certificat médical
        if ($request->hasFile('medical_certificate')) {
            $path = $request->file('medical_certificate')
                            ->store('certificates', 'public');
            $data['medical_certificate'] = $path;
        }

        $leave = $this->leaveRequestRepository->create($data);
        $leave->load(['user', 'processedBy']);

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

        $data = $request->all();

        if ($request->user() && in_array($request->user()->role, ['director', 'directeur'])) {
            $data['processed_by'] = $request->user()->id;
        }

        $leave = $this->leaveRequestRepository->update($leave, $data);
        $leave->load(['user', 'processedBy']);

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
