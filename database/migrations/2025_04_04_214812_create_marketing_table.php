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
        Schema::create('marketing', function (Blueprint $table) {
            $table->increments('id');
            $table->string('produto', 200);
            $table->string('preco', 200);
            $table->text('estrategia_promo'); // Campo de texto longo para a estratégia promocional
            $table->text('estrategia_comer'); // Campo de texto longo para a estratégia de comercialização
            $table->string('localizacao', 100); // Limitado a 100 caracteres para o campo de localização
            $table->unsignedBigInteger('id_plano')->nullable();
            $table->timestamps();

            $table->foreign('id_plano')->references('id')->on('plano_negocios')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('marketing', function (Blueprint $table) {
            $table->dropForeign(['id_plano']);
        });
        Schema::dropIfExists('marketing');
    }
};
