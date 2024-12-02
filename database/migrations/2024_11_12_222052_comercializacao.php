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
        Schema::create('comercializacao', function (Blueprint $table) {
            $table->id(); 
            $table->unsignedBigInteger('id_plano');
            $table->decimal('total_impostos', 15, 2)->default(0.00);
            $table->decimal('total_gastos_vendas', 15, 2)->default(0.00);
            $table->decimal('total_geral', 15, 2)->default(0.00);
            $table->timestamps();
            $table->foreign('id_plano')->references('id')->on('plano_negocios')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
        Schema::dropIfExists('comercializacao');
    }
};
