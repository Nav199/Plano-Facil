<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InvestimentoFixo extends Model
{
    use HasFactory;

    protected $table = 'investimentos_fixos';

    protected $fillable = [
        'imoveis',
        'maquinas',
        'equipamentos',
        'veiculos',
        'móveis_utensílios',
        'computadores',
        'subtotal_imoveis',
        'subtotal_maquinas',
        'subtotal_equipamentos',
        'subtotal_veiculos',
        'subtotal_móveis_utensílios',
        'subtotal_computadores',
        'total_geral',
        'id_plano',
    ];

    // Defina a relação com o modelo PlanoNegocio
    public function planoNegocio()
    {
        return $this->belongsTo(Plano::class, 'id_plano');
    }
}