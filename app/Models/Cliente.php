<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cliente extends Model
{
    use HasFactory;
    protected $table = 'clientes';

    protected $fillable = [
        'id', 'id_plano','perfil','Comportamento','area',
    ];

    public function plano()
    {
        return $this->belongsTo(Plano::class,'id_plano');
    }
}
