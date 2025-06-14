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
            $table->string('fonte_recursos');
            $table->string('visao');
            $table->string('valores');
            $table->string('missao');
            $table->string('setor_atividade');
            $table->string('cpf_cnpj', 18);
            $table->string('nome_empresa');
            $table->timestamps();

            $table->unsignedBigInteger('id_plano')->nullable();
            $table->foreign('id_plano')->references('id')->on('plano_negocios')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('executivo', function (Blueprint $table) {
            $table->dropForeign(['id_plano']);
            $table->dropColumn('id_plano');
        });
    }
};
