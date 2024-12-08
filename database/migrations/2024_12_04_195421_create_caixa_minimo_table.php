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
            $table->id(); // ID auto-increment
            $table->unsignedBigInteger('id_plano'); // Chave estrangeira para plano_negocios
            $table->integer('necessidade_estoque'); // Necessidade de estoque (inteiro)
            $table->decimal('capital_giro', 10, 2); // Capital de giro (decimal)
            $table->decimal('estoque_inicial', 10, 2); // Estoque inicial (decimal)
            $table->timestamps(); // created_at e updated_at
            
            // Definição da chave estrangeira
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
