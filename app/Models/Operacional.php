<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Operacional extends Model
{
    use HasFactory;
    protected $table='operacional';

    protected $fillable = [
        'capacidade','volume','cargo','qualificacao','id_plano'
    ]; 

    public function planoNegocios()
    {
        return $this->belongsTo(Plano::class,'id_plano');
    }
}
