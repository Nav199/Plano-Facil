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
        Schema::create('caixa_minimo', function (Blueprint $table) {
            $table->id(); 
            $table->unsignedBigInteger('id_plano'); 
            $table->decimal('capital_giro', 25, 2);
            $table->decimal('caixa_minimo', 25, 2);
            $table->decimal('necessidade_estoque', 25, 2);
            $table->decimal('estoque_inicial', 25, 2);
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
        Schema::dropIfExists('caixa_minimo');
    }
};
