<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comercializacao extends Model
{
    use HasFactory;

    protected $table = 'comercializacao';

    protected $fillable = [
        'id_plano',
        'total_impostos',
        'total_gastos_vendas',
        'total_geral',
    ];

    public function planoNegocio()
    {
        return $this->belongsTo(Plano::class, 'id_plano');
    }
}
