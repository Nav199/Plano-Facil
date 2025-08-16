<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
 
class caixa_minimo extends Model 
{
    use HasFactory;
    protected $table = 'caixa_minimo';

   protected $fillable = [
    'id_plano',
    'necessidade_estoque',
    'capital_giro',
    'estoque_inicial',
    'caixa_minimo',
];

    public function plano()
    {
        return $this->belongsTo(Plano::class,'id_plano');
    }

    public function faturamento()
    {
        return $this->hasMany(Faturamento::class, 'id_plano');
    }

    public function custos_fixos()
    {
        return $this->hasMany(CustoFixo::class, 'id_plano');
    }

    public function custos_variaveis()
    {
        return $this->hasMany(Apuracao::class, 'id_plano');
    }

    public function estoque()
    {
        return $this->hasMany(Estoque::class, 'id_plano');
    }
}
