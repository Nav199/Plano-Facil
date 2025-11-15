<?php

namespace App\Models;
 
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Demonstrativo extends Model
{
    use HasFactory;

    protected $table = 'demonstrativo';

    protected $fillable = [
        'id_plano', 'lucro_valor','lucro_anual','porcentagem_lucro'
    ];
}
