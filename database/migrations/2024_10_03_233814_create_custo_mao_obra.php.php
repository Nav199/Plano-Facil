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
        //
        Schema::create('mao_obra', function (Blueprint $table) {
            $table->id(); // ID auto-increment
            $table->unsignedBigInteger('id_plano'); // ID do produto, que pode ser referenciado na tabela de produtos
            $table->string('funcao');
            $table->integer('empregado'); // Quantidade
            $table->decimal('salario', 10, 2); // Valor unitário
            $table->decimal('encargo', 10, 2); // Valor unitário
            $table->decimal('total', 10, 2); // Total (quantidade * valor unitário)
            $table->decimal('total_geral', 10, 2)->nullable(); // Total geral armazenado (soma de todos os totais)
            $table->timestamps(); // Campos de created_at e updated_at

            // Adicionando a chave estrangeira para a tabela de produtos
            $table->foreign('id_plano')->references('id')->on('plano_negocios')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
        Schema::dropIfExists('mao_obra');
    }
};
