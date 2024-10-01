<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Imoveis extends Model
{
    use HasFactory; 

    protected $table = 'imoveis';

    protected $fillable = [
        'descricao', 'quantidade', 'valor_unitario', 'total', 'id_plano'
   ];
}
