<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Apuracao extends Model
{
    use HasFactory;
    protected $table = 'apuracao';
     
    protected $fillable = [
        'id_plano','descricao', 'vendas', 'custo', 'crescimento','total'
   ]; 
       // Relação com o modelo Plano
       public function planoNegocio()
       {
           return $this->belongsTo(Plano::class, 'id_plano');
       }
}
