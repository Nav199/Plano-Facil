<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Mercado extends Model
{
    use HasFactory;
    protected $table='plano_mercado';

    protected $fillable = [
        'id_plano',
   ];

    public function plano_negocio()
    {
        return $this->belongsTo(Plano::class,'id_plano');
    }
}
