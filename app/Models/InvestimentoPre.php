<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InvestimentoPre extends Model
{
    use HasFactory;

    protected $table = 'investimentopre';

    
    protected $fillable = [
        'id_plano','descricao','valor','total'
    ];
}
