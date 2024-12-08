<?php

namespace App\Http\Controllers;

use App\Models\caixa_minimo;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CaixaController extends Controller
{
    //
     
    public function create($id)
    {
        return Inertia::render('CaixaMinimo', [
            'status'=> session('status'),
            'planoId'=>$id
        ]);
    }

    public function calcular_caixa_minimo($id)
    {
        // Busca o caixa mínimo com custos fixos e variáveis
        $caixa_minimo = caixa_minimo::with('custos_fixos', 'custos_variaveis','estoque')->find($id);
    
        if ($caixa_minimo) {
            // Cálculo do custo fixo mensal
            $custo_fixo_mensal = $caixa_minimo->custos_fixos->sum('total');


            $estoque = $caixa_minimo->estoque->sum('total');
        
            // Cálculo do custo variável mensal (multiplicando custo por vendas para cada item)
            $custo_variavel_mensal = $caixa_minimo->custos_variaveis->sum(function ($item) {
                return $item->custo * $item->vendas;
            });
        
            // Cálculo do custo total da empresa
            $custo_total_empresa = $custo_fixo_mensal + $custo_variavel_mensal;
        
            // Cálculo do custo total diário (dividido por 30 dias)
            $custo_total_diario = $custo_total_empresa / 30;
        
            return Inertia::render('CaixaMinimo', [
                'custo_fixo_mensal' => $custo_fixo_mensal,
                'custo_variavel_mensal' => $custo_variavel_mensal,
                'custo_total_empresa' => $custo_total_empresa,
                'custo_total_diario' => $custo_total_diario, // Assegure-se de que esse dado seja passado aqui
                'estoque' => $estoque,
            ]);
            
            
            
        } else {
            return response()->json(['error' => 'Caixa mínimo não encontrado'], 404);
        }
    }
    
}

