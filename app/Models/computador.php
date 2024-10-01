<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class computador extends Model
{
    use HasFactory;

    protected $table = 'computador';

    protected $fillable = [
        'descricao', 'quantidade', 'valor_unitario', 'total', 'id_plano'
   ]; 
       // Relação com o modelo Plano
       public function planoNegocio()
       {
           return $this->belongsTo(Plano::class, 'id_plano');
       }
}
