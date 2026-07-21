<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Concerns\ApiResponse;
use App\Repositories\UserRepository;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use App\Mail\EmployeeAccountCreated;
use Illuminate\Support\Facades\Mail;

class EmployeeController extends Controller
{
    use ApiResponse;

    protected $userRepository;

    /**
     * Injection du Repository
     */
    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    /**
     * Display all employees
     */
    public function index()
    {
        return response()->json($this->userRepository->getEmployees());
    }

    /**
     * Display all directors
     */
    public function getDirectors()
    {
        return response()->json($this->userRepository->getDirectors());
    }

    /**
     * Create a new employee account
     */
    public function store(Request $request)
    {
        $request->validate([
            'last_name' => 'required|string|max:100',
            'first_name' => 'required|string|max:100',
            'email' => 'required|email|unique:users',
            'phone' => 'nullable|string|max:20',
            'position' => 'nullable|string|max:100',
            'hire_date' => 'nullable|date',
        ]);

        $resetToken = Str::random(64);

        // Création de l'employé
        $employee = $this->userRepository->create([
            $request->only([
                'last_name',
                'first_name',
                'password' => Hash::make(Str::random(40)),
                'reset_token' => $resetToken,
                'phone',
                'position',
                'hire_date'
            ])
        ]);

        $link = env('FRONTEND_URL') . '/reset-password/' . $resetToken;

        Mail::to($employee->email)
            ->send(new EmployeeAccountCreated(
                $employee,
                $link
            ));

        return $this->createdResponse($employee, 'Employee account created successfully.', 'employee');
    }

    /**
     * Display one employee
     */
    public function show($id)
    {
        $employee = $this->userRepository->findEmployee($id);

        if (!$employee) {
            return $this->notFoundResponse('Employee not found.');
        }

        return response()->json($employee);
    }

    /**
     * Update employee
     */
    public function update(Request $request, $id)
    {
        $employee = $this->userRepository->findEmployee($id);

        if (!$employee) {
            return $this->notFoundResponse('Employee not found.');
        }

        $request->validate([
            'last_name' => 'sometimes|string|max:100',
            'first_name' => 'sometimes|string|max:100',
            'email' => 'sometimes|email|unique:users,email,' . $id,
            'phone' => 'nullable|string|max:20',
            'position' => 'nullable|string|max:100',
            'hire_date' => 'nullable|date',
        ]);

        $employee = $this->userRepository->update(
            $employee,
            $request->only([
                'last_name',
                'first_name',
                'email',
                'phone',
                'position',
                'hire_date'
            ])
        );

        return $this->successResponse($employee, 'Employee updated successfully.', 200, 'employee');
    }

    /**
     * Delete employee
     */
    public function destroy($id)
    {
        $employee = $this->userRepository->findEmployee($id);

        if (!$employee) {
            return $this->notFoundResponse('Employee not found.');
        }

        $this->userRepository->delete($employee);

        return $this->messageResponse('Employee deleted successfully.');
    }
}
