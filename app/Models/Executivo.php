<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Executivo extends Model
{
    use HasFactory;

    protected $table = 'executivo';

    protected $fillable = [
         'fonte_recursos', 'visao', 'valores', 'missao', 'setor_atividade', 'cpf_cnpj', 'nome_empresa', 'id_plano',
    ];

    public function planoNegocios()
    {
        return $this->belongsTo(Plano::class, 'id_plano');
    }
}
