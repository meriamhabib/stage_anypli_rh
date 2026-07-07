<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('tasks', function (Blueprint $table) {

            $table->id();

            $table->foreignId('user_id')
                  ->constrained('users')
                  ->cascadeOnDelete();

            $table->string('titre');

            $table->text('description')->nullable();

            $table->enum('priorite', [
                'basse',
                'moyenne',
                'haute'
            ])->default('moyenne');

            $table->enum('statut', [
                'a_faire',
                'en_cours',
                'en_pause',
                'termine'
            ])->default('a_faire');

            $table->date('date_echeance')->nullable();

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('tasks');
    }
};