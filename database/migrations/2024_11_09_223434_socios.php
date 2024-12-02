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
        Schema::create('socios', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('id_plano');  // Relação com o plano de negócios
            $table->string('nome');
            $table->unsignedBigInteger('endereco_id');  // Chave estrangeira para o endereço
            $table->string('cpf');
            $table->string('curriculo');
            $table->string('funcao');
            $table->timestamps();

            $table->foreign('id_plano')->references('id')->on('plano_negocios')->onDelete('cascade'); // Relação com a tabela de plano de negócios
            $table->foreign('endereco_id')->references('id')->on('enderecos')->onDelete('cascade');  // Relacionamento com a tabela de endereços
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('socios');
    }
};
