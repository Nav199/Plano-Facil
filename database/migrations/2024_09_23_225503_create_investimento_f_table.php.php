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
        Schema::create('investimentos_fixos', function (Blueprint $table) {
            $table->id();
            $table->json('imoveis');
            $table->json('maquinas');
            $table->json('equipamentos');
            $table->json('veiculos');
            $table->json('móveis_utensílios');
            $table->json('computadores');
            $table->decimal('subtotal_imoveis', 10, 2);
            $table->decimal('subtotal_maquinas', 10, 2);
            $table->decimal('subtotal_equipamentos', 10, 2);
            $table->decimal('subtotal_veiculos', 10, 2);
            $table->decimal('subtotal_móveis_utensílios', 10, 2);
            $table->decimal('subtotal_computadores', 10, 2);
            $table->decimal('total_geral', 10, 2);
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
        Schema::table('operacional', function (Blueprint $table) {
            $table->dropForeign(['id_plano']);
        });
        Schema::dropIfExists('investimentos_fixos');
    }
}; 