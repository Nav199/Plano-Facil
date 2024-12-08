<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class avaliacao extends Model
{
    use HasFactory;

    protected $table = 'avaliacao';

    protected $fillable = [
        'id_plano','analise'
   ]; 


   public function planoNegocio()
   {
       return $this->belongsTo(Plano::class, 'id_plano');
   }
}
