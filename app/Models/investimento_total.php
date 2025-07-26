<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class investimento_total extends Model
{
    use HasFactory;
    protected $table = 'investimento_total';
  
    protected $fillable = [
        'id_plano', 'total_investimento'
   ];
}
