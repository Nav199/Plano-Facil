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
            
            $table->unsignedBigInteger('id_plano'); 
            $table->unsignedBigInteger('endereco_id');  
            $table->string('nome');
            $table->string('cpf');
            $table->string('curriculo');
            $table->string('funcao');
            $table->decimal('capital_investido', 15, 2)->default(0);
            $table->decimal('participacao', 5, 2)->default(0);

            $table->timestamps();

            $table->foreign('id_plano')
                ->references('id')->on('plano_negocios')
                ->onDelete('cascade');

            $table->foreign('endereco_id')
                ->references('id')->on('enderecos')
                ->onDelete('cascade');
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
