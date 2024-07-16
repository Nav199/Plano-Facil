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
        Schema::create('executivo', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedBigInteger('id_user');
            $table->string('fonte_recursos');
            $table->string('visao');
            $table->string('valores');
            $table->string('missao');
            $table->string('setor_atividade');
            $table->string('cpf_cnpj', 18);
            $table->string('nome_empresa');
            $table->timestamps();

            $table->foreign('id_user')
                  ->references('id') 
                  ->on('users')
                  ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('executivo');
    }
};
