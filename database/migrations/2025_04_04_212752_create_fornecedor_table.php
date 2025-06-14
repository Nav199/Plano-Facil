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
        Schema::create('fornecedor', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedBigInteger('id_plano');
            $table->string('descricao', 200);
            $table->string('nome', 200);
            $table->float('preco');
            $table->string('pagamento', 200);
            $table->string('localizacao', 200);
            $table->string('prazo_entrega')->nullable();
            $table->timestamps();

            $table->foreign('id_plano')->references('id')->on('plano_negocios')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('fornecedor');
    }
};
