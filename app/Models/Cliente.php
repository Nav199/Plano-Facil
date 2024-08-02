<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cliente extends Model
{
    use HasFactory;
    protected $table = 'clientes';

    protected $fillable = [
        'id', 'id_mercado','perfil','Comportamento','area',
    ];

    public function mercado()
    {
        return $this->belongsTo(Mercado::class,'id_mercado');
    }
}
