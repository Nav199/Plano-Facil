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
        Schema::create('clientes', function (Blueprint $table) {
            $table->id();
            $table->text('perfil');
            $table->text('comportamento');
            $table->text('area');
            $table->unsignedBigInteger('id_plano');
            $table->timestamps();
        
            $table->foreign('id_plano')
                  ->references('id')
                  ->on('plano_negocios')
                  ->onDelete('cascade');
        });
        
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('clientes');
    }
};
