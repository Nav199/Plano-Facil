<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Socios extends Model
{
    use HasFactory;

    protected $table = 'socios';

    protected $fillable = ['id_plano', 'nome', 'cpf', 'curriculo', 'funcao', 'endereco_id'];

    // Relacionamento com o Endereço
    public function endereco()
    {
        return $this->belongsTo(EnderecoSocios::class);
    }

    // Relacionamento com o Plano
    public function plano()
    {
        return $this->belongsTo(Plano::class);
    }
}

