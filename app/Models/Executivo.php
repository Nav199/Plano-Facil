<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Executivo extends Model
{
    use HasFactory;

    protected $table = 'executivo';

    protected $fillable = [
        'id_user', 'fonte_recursos', 'visao', 'valores', 'missao', 'setor_atividade', 'cpf_cnpj', 'nome_empresa',
    ];
}
