<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('leave_requests', function (Blueprint $table) {

            $table->id();

            // Employé qui fait la demande
            $table->foreignId('user_id')
                  ->constrained('users')
                  ->cascadeOnDelete();

            // Type de congé
            $table->enum('leave_type', [
                'annual',
                'sick',
                'personal'
            ]);

            // Dates
            $table->date('start_date');
            $table->date('end_date');

            // Motif
            $table->text('reason');

            // Certificat médical (chemin du fichier)
            $table->string('medical_certificate')->nullable();

            // Statut
            $table->enum('status', [
                'pending',
                'approved',
                'rejected'
            ])->default('pending');

            // Date de la demande
            $table->timestamp('request_date')->useCurrent();

            // Directeur qui traite la demande
            $table->foreignId('processed_by')
                  ->nullable()
                  ->constrained('users')
                  ->nullOnDelete();

            // Commentaire du directeur
            $table->text('comment')->nullable();

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('leave_requests');
    }
};