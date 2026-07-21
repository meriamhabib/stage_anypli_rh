<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class DirectorSeeder extends Seeder
{
    public function run(): void
    {
        $email = env('DIRECTOR_EMAIL', 'director@example.com');

        // Use a password provided via the environment; otherwise generate a
        // strong random one and print it once so no weak default is baked in.
        $password = env('DIRECTOR_PASSWORD');

        if (empty($password)) {
            $password = Str::random(20);
            $this->command?->warn("Generated director password for {$email}: {$password}");
        }

        User::firstOrCreate(

            [
                'email' => $email
            ],

            [
                'last_name' => 'Admin',

                'first_name' => 'Director',

                'password' => Hash::make($password),

                'phone' => '22000000',

                'role' => 'director',

                'position' => 'Director',

                'hire_date' => now()
            ]
        );
    }
}