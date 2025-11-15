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
        Schema::create('demonstrativo', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('id_plano'); 
            $table->decimal('lucro_valor', 15, 2); 
            $table->decimal('lucro_anual', 15, 2); 
            $table->decimal('porcentagem_lucro', 10, 3); 
            $table->timestamps(); 
            $table->foreign('id_plano')->references('id')->on('plano_negocios')->onDelete('cascade');
        });
    }
 
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('demonstrativo');
    }
};
