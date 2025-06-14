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
        Schema::create('investimentopre', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('id_plano');
            $table->string('descricao');
            $table->decimal('valor', 15, 2); 
            $table->decimal('total', 15, 2)->nullable();
            $table->timestamps();

            $table->foreign('id_plano')
                  ->references('id')
                  ->on('plano_negocios')
                  ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('investimentopre');
    }
};
