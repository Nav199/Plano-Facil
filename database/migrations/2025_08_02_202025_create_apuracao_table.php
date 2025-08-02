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
        Schema::create('apuracao', function (Blueprint $table) {
    $table->id(); 
    $table->unsignedBigInteger('id_plano');
    $table->string('descricao');
    $table->decimal('vendas', 20, 2);
    $table->decimal('custo', 20, 2);
    $table->decimal('crescimento', 10, 2);
    $table->decimal('total', 20, 2);
    $table->timestamps();

    $table->foreign('id_plano')->references('id')->on('plano_negocios')->onDelete('cascade');
});

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('apuracao');
    }
};
