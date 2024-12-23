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
        Schema::create('indicadores', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('id_plano'); // Relacionamento com o plano
            $table->foreign('id_plano')
            ->references('id')
            ->on('plano_negocios')
            ->onDelete('cascade');

            // Indicadores financeiros
            $table->decimal('lucrabilidade_mensal', 15, 2);
            $table->decimal('lucrabidade_anual', 15, 2);
            $table->decimal('ponto_equilibrio_mensal', 15, 2);
            $table->decimal('ponto_equilibrio_anual', 15, 2);
            $table->decimal('rentabilidade_mensal', 5, 2);
            $table->decimal('rentabilidade_anual', 5, 2);
            $table->decimal('roi_mensal', 5, 2);
            $table->decimal('roi_anual', 5, 2);

            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('indicadores');
    }
};
