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
        Schema::create('analise', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('id_plano'); // Relaciona com a tabela de planos
            $table->text('forcas')->nullable(); // Armazena os pontos fortes
            $table->text('fraquezas')->nullable(); // Armazena as fraquezas
            $table->text('oportunidades')->nullable(); // Armazena as oportunidades
            $table->text('ameacas')->nullable(); // Armazena as ameaças
            $table->text('acoes')->nullable(); // Armazena as ações estratégicas
            $table->timestamps();
 
            // Chave estrangeira opcional (se "plano" for outra tabela)
            $table->foreign('id_plano')->references('id')->on('plano_negocios')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('analise');
    }
};
