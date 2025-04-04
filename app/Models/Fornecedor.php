<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Fornecedor extends Model
{
    use HasFactory;

    protected $table = 'fornecedor';

    protected $fillable = [
        'id', 'id_plano', 'descricao', 'nome', 'preco', 'pagamento', 'localizacao', 'prazo_entrega'
    ];
    
    public function plano()
    {
        return $this->belongsTo(Plano::class,'id_plano');
    }
}
