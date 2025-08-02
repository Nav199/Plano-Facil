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
        Schema::create('estoque', function (Blueprint $table) {
            $table->id();
            $table->string('descricao');
            $table->integer('quantidade');
            $table->decimal('valor_unitario', 20, 2);
            $table->decimal('total', 20, 2);
            $table->unsignedBigInteger('id_plano')->nullable();
            $table->timestamps();

            $table->foreign('id_plano')->references('id')->on('plano_negocios')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('estoque');
    }
};
