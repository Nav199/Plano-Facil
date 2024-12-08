<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Demonstrativo extends Model
{
    use HasFactory;

    protected $table = 'demonstrativo';

    protected $fillable = [
        'id_plano', 'resultado_operacional','lucro_mensal','porcentagem_lucro'
    ];
}
