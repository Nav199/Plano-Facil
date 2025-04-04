<?php

namespace App\Models;
 
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Marketing extends Model
{
    use HasFactory;

    protected $table='marketing';

    protected $fillable = [
        'produto','preco','estrategia_promo','estrategia_comer','localizacao','id_plano'
    ];
}
