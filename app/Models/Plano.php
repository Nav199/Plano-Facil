<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Plano extends Model
{
    use HasFactory;

    protected $table = 'plano_negocios';

    protected $fillable = [
        'id_user', 'nome',
    ];

    public function executivos()
    {
        return $this->hasMany(Executivo::class, 'id_plano');
    }

    public function investimento_fixo()
    {
        return $this->hasMany(InvestimentoFixo::class,'id_plano');
    }
}
