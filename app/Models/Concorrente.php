<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Concorrente extends Model
{
    use HasFactory;
    protected $table = 'concorrente';
    protected $fillable = [
        'id', 'id_plano','qualidade','nome','pagamento','preco','garantias','servico','localizacao'
    ];
    public function plano()
    {
        return $this->belongsTo(Plano::class,'id_plano');
    }
}
