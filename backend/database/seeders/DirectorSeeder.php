<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class DirectorSeeder extends Seeder
{
    public function run(): void
    {
        User::firstOrCreate(

            [
                'email' => 'director@gmail.com'
            ],

            [
                'last_name' => 'Admin',

                'first_name' => 'Director',

                'password' => Hash::make('Director123'),

                'phone' => '22000000',

                'role' => 'director',

                'position' => 'Director',

                'hire_date' => now()
            ]
        );
    }
}