<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('custo_fixo', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('id_plano');
            $table->string('descricao');
            $table->decimal('custo', 15, 2); // mais preciso que double
            $table->integer('crescimento');
            $table->decimal('total', 15, 2);
            $table->timestamps();

            $table->foreign('id_plano')
                  ->references('id')
                  ->on('plano_negocios')
                  ->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('custo_fixo'); // corrigido aqui
    }
};
