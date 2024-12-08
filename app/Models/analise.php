<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class analise extends Model
{
    use HasFactory;
    
    protected $table = 'analise';

    protected $fillable = [
        'id_plano','forcas', 'fraquezas', 'oportunidades', 'ameacas','acoes'
   ]; 

   public function planoNegocio()
   {
       return $this->belongsTo(Plano::class, 'id_plano');
   }
}
