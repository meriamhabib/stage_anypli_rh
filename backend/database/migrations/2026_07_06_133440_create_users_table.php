<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('last_name', 100);
            $table->string('first_name', 100);
            $table->string('email', 191)->unique();
            $table->string('password', 255);
            $table->string('phone', 20)->nullable();
            $table->enum('role', ['director', 'employee'])->default('employee');
            $table->string('position', 100)->nullable();
            $table->date('hire_date')->nullable();
            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
