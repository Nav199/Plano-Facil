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
        Schema::create('faturamento', function (Blueprint $table) {
            $table->id(); // ID auto-increment
            $table->unsignedBigInteger('id_plano');
            $table->string('produto');
            $table->integer('quantidade');
            $table->decimal('valor_unitario', 20, 2);
            $table->decimal('total', 20, 2);
            $table->decimal('crescimento');
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
        Schema::dropIfExists('faturamento');
    }
};
