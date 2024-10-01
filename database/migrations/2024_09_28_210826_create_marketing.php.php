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
            $table->string('produto', 40);
            $table->string('preco', 40);
            $table->string('estrategia_promo', 60);
            $table->string('estrategia_comer',60); 
            $table->string('localizacao', 40);
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
        //
        Schema::table('marketing', function (Blueprint $table) {
            $table->dropForeign(['id_plano']);
        });
        Schema::dropIfExists('marketing');
    }
};
