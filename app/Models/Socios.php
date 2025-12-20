<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Socios extends Model
{
    use HasFactory;

    protected $table = 'socios';

    protected $fillable = [
        'id_plano',
        'nome',
        'cpf',
        'curriculo',  
        'funcao',
        'endereco_id'
    ];

    public function endereco()
    {
        return $this->belongsTo(EnderecoSocios::class, 'endereco_id');
    }

    public function plano()
    {
        return $this->belongsTo(Plano::class, 'id_plano');
    }
}
