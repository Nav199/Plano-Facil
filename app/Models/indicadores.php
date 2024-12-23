<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class indicadores extends Model
{
    use HasFactory;

    protected $table = 'indicadores'; 

    protected $fillable = [
        'id_plano',
        'lucrabilidade_mensal',
        'lucrabidade_anual',
        'ponto_equilibrio_mensal',
        'ponto_equilibrio_anual',
        'rentabilidade_mensal',
        'rentabilidade_anual',
        'roi_mensal',
        'roi_anual',
    ];

    // Relacionamento com o plano
    public function plano()
    {
        return $this->belongsTo(Plano::class);
    }
}
