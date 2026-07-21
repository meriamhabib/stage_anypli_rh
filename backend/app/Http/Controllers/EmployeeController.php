<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Repositories\UserRepository;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use App\Mail\EmployeeAccountCreated;
use Illuminate\Support\Facades\Mail;

class EmployeeController extends Controller
{
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
        $employees = $this->userRepository->getEmployees();

        return response()->json($employees);
    }

    public function getDirectors()
    {
        $directors = $this->userRepository->getDirectors();

        return response()->json($directors);
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
        $employee = $this->userRepository->create(array_merge(
            $request->only([
                'last_name',
                'first_name',
                'email',
                'phone',
                'position',
                'hire_date',
            ]),
            [
                'role' => 'employee',
                'password' => Hash::make(Str::random(40)),
            ]
        ));

        $employee->reset_token = $resetToken;
        $employee->save();



        $link = env('FRONTEND_URL') . '/reset-password/' . $resetToken;

        Mail::to($employee->email)
        ->send(new EmployeeAccountCreated(
        $employee,
        $link
         ));



        return response()->json([

            'message' => 'Employee account created successfully.',

            'employee' => $employee

        ], 201);

    }




    /**
     * Display one employee
     */
    public function show($id)
    {

        $employee = $this->userRepository->findEmployee($id);


        if (!$employee) {

            return response()->json([

                'message' => 'Employee not found.'

            ], 404);

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

            return response()->json([

                'message' => 'Employee not found.'

            ], 404);

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



        return response()->json([

            'message' => 'Employee updated successfully.',

            'employee' => $employee

        ]);

    }




    /**
     * Delete employee
     */
    public function destroy($id)
    {

        $employee = $this->userRepository->findEmployee($id);


        if (!$employee) {

            return response()->json([

                'message' => 'Employee not found.'

            ],404);

        }



        $this->userRepository->delete($employee);



        return response()->json([

            'message' => 'Employee deleted successfully.'

        ]);

    }

}