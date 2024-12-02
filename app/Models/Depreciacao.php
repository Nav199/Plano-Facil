<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Depreciacao extends Model
{
    use HasFactory;

    protected $table = 'depreciacao';

    protected $fillable = [
        'id_plano',
        'ativos',
        'valor',
        'anos',
        'anual',
        'mensal',
        'total'
    ];
}