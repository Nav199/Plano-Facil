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
            $table->unsignedBigInteger('id_plano')->nullable(); // Certifique-se de que o tipo de dados é compatível
            $table->string('capacidade', 80);
            $table->string('volume', 60);
            $table->string('cargo', 30);
            $table->string('qualificacao', 60);
            $table->timestamps();

            // Adicionando a chave estrangeira
            $table->foreign('id_plano')
                  ->references('id')
                  ->on('plano_negocios') // Certifique-se de que o nome da tabela está correto
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
