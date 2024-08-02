<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('forma_juridica', function (Blueprint $table) {
            $table->id(); 
            $table->string('tipo');
            $table->timestamps();

            $table->unsignedBigInteger('id_plano')->nullable();
            $table->foreign('id_plano')->references('id')->on('plano_negocios')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('forma_juridica');
    }
};
