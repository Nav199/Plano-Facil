<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('imoveis', function (Blueprint $table) {
            $table->id();
            $table->string('descricao'); // Descrição do imóvel
            $table->integer('quantidade'); // Quantidade de imóveis
            $table->decimal('valor_unitario', 10, 2); // Valor unitário
            $table->decimal('total', 10, 2); // Total do investimento em imóveis
            $table->unsignedBigInteger('id_plano')->nullable(); // Chave estrangeira para plano_negocios
            $table->timestamps();

            $table->foreign('id_plano')->references('id')->on('plano_negocios')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down() 
    {
        Schema::dropIfExists('imoveis');
    }
};
