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

            $table->foreignId('user_id')
                  ->constrained('users')
                  ->cascadeOnDelete();

            $table->date('date_debut');

            $table->date('date_fin');

            $table->text('motif');

            $table->string('certificat')->nullable();

            $table->enum('statut', [
                'en_attente',
                'acceptee',
                'rejetee'
            ])->default('en_attente');

            $table->timestamp('date_demande')->useCurrent();

            $table->foreignId('traite_par')
                  ->nullable()
                  ->constrained('users')
                  ->nullOnDelete();

            $table->text('commentaire')->nullable();

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('leave_requests');
    }
};