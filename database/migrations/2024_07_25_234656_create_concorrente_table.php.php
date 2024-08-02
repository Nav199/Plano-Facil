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
        Schema::create('concorrente', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('id_mercado');
            $table->string('qualidade', 40);
            $table->string('nome', 40);
            $table->string('pagamento', 40);
            $table->float('preco');
            $table->string('garantias', 40);
            $table->string('servico', 40);
            $table->string('localizacao', 40);
            $table->timestamps();

            $table->foreign('id_mercado')->references('id')->on('plano_mercado')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
        Schema::dropIfExists('concorrente');
    }
};
