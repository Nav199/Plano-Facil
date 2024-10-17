<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Faturamento extends Model
{
    use HasFactory;

    protected $table = 'faturamento';

    protected $fillable = [
        'id', 'id_plano','produto','quantidade','valor_unitario','total'
    ];
    public function plano()
    {
        return $this->belongsTo(Plano::class,'id_plano');
    }
}
