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
        Schema::create('operacional', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedBigInteger('id_plano')->nullable(); 
            $table->string('capacidade', 200);
            $table->string('volume', 200);
            $table->string('cargo', 100);
            $table->string('qualificacao', 100);
            $table->string('processos', 250);
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
        Schema::table('operacional', function (Blueprint $table) {
            $table->dropForeign(['id_plano']);
        });
        Schema::dropIfExists('operacional');
    }
};
