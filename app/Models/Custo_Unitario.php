<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Custo_Unitario extends Model
{
    use HasFactory;

    protected $table = 'custo_unitario';

    protected $fillable = [
        'id_plano', 'material', 'quantidade', 'valor_unitario', 'total','total_geral '
   ]; 
}
