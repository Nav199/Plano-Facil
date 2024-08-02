<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Concorrente extends Model
{
    use HasFactory;
    protected $table = 'concorrente';
    protected $fillable = [
        'id', 'id_mercado','qualidade','nome','pagamento','preco','garantias','servico','localizacao'
    ];
    public function mercado()
    {
        return $this->belongsTo(Mercado::class,'id_mercado');
    }
}
