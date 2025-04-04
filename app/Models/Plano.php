<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Plano extends Model
{
    use HasFactory;

    protected $table = 'plano_negocios';

    protected $fillable = [
        'id_user', 'nome',
    ];

    public function executivos()
    {
        return $this->hasMany(Executivo::class, 'id_plano');
    }

    public function veiculo()
    {
        return $this->hasMany(veiculo::class, 'id_plano');
    }

    public function maquina()
    {
        return $this->hasMany(maquina::class, 'id_plano');
    }

    public function imoveis()
    {
        return $this->hasMany(imoveis::class, 'id_plano');
    }

    public function equipamento()
    {
        return $this->hasMany(equipamento::class, 'id_plano');
    }

    public function computador()

    {
        return $this->hasMany(computador::class,'id_plano');
    }

    public function moveis()
    {
        return $this->hasMany(moveis::class,'id_plano');
    }

    public function Forma()
    {
        return $this->hasMany(Forma::class, 'id_plano');
    }

    public function enquadramento()
    {
        return $this->hasMany(Enquadramento::class, 'id_plano');
    }

    public function investimento_pre()
    {
        return $this->hasMany(InvestimentoPre::class, 'id_plano');
    }

    public function Faturamento()
    {
        return $this->hasMany(Faturamento::class, 'id_plano');
    }
    public function clientes(){ 
        return $this->hasMany(Cliente::class, 'id_plano');
    }
    public function fornecedores(){
        return $this->hasMany(Fornecedor::class, 'id_plano');
    }
    public function concorrentes(){
        return $this->hasMany(Concorrente::class, 'id_plano');
    }
    public function marketing(){
        return $this->hasMany(Marketing::class, 'id_plano');
    }

    public function analise()
    {
        return $this->hasMany(analise::class, 'id_plano');
    }

    public function apuracao()
    {
        return $this->hasMany(apuracao::class, 'id_plano');
    }

    public function estoque()
    {
        return $this->hasMany(estoque::class, 'id_plano');
    }

    public function mao_obra()
    {
        return $this->hasMany(Obra::class, 'id_plano');
    }

    public function demonstrativo()
    {
        return $this->hasMany(demonstrativo::class, 'id_plano');
    }

    public function custo_fixo()
    {
        return $this->hasMany(CustoFixo::class,'id_plano');
    }

    public function comercializacao()
    {
        return $this->hasMany(Comercializacao::class,'id_plano');
    }

    public function avaliacao()
    {
        return $this->hasMany(avaliacao::class,'id_plano');
    }

    public function socios()
    {
        return $this->hasMany(Socios::class,'id_plano');
    }

    public function capital_giro()
    {
        return $this->hasMany(caixa_minimo::class,'id_plano');
    }

    public function investimento_total()
    {
        return $this->hasMany(investimento_total::class,'id_plano');
    }

    public function indicadores()
    {
        return $this->hasMany(indicadores::class,'id_plano');
    }

    public function depreciacao()
    {
        return $this->hasMany(depreciacao::class,'id_plano');
    }

    public function custo_unitario()
    {
        return $this->hasMany(custo_unitario::class,'id_plano');
    }

}
