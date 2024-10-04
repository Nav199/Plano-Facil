<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Obra extends Model
{
    use HasFactory;

    protected $table = 'mao_obra';

    protected $fillable = [
        'id_plano', 'funcao', 'empregado', 'salario', 'encargo','total','total_geral'
   ]; 
}
