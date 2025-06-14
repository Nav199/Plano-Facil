<?php

namespace App\Http\Controllers;

use App\Models\caixa_minimo;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;
class CaixaController extends Controller
{
    //
     
    public function create($id)
    {
        $caixa = $this->calcular_caixa_minimo($id);

        return Inertia::render('CaixaMinimo', [
            'status'=> session('status'),
            'caixa'=>$caixa,
            'planoId'=>$id
        ]);
    }

    public function calcular_caixa_minimo($id)
    { 
        // Recupera somatórios de custos fixos, custos variáveis e estoque do banco de dados
        $custos_fixos = DB::selectOne("SELECT SUM(custo) AS total_sum FROM custo_fixo WHERE id_plano = ?", [$id])->total_sum ?? 0;
        $custos_variaveis = DB::selectOne("SELECT SUM(total) AS total_sum FROM apuracao WHERE id_plano = ?", [$id])->total_sum ?? 0;
        $estoque = DB::selectOne("SELECT SUM(total) AS total_sum FROM estoque WHERE id_plano = ?", [$id])->total_sum ?? 0;
    
        // Cálculos de custo total e custo diário
        $custo_total_empresa = $custos_fixos + $custos_variaveis;
        $custo_total_diario = $custo_total_empresa / 30;
    
        // Retorna os valores para a view do front-end
        return [
            'custo_fixo_mensal' => $custos_fixos,
            'custo_variavel_mensal' => $custos_variaveis,
            'custo_total_empresa' => $custo_total_empresa,
            'custo_total_diario' => $custo_total_diario,
            'estoque' => $estoque
        ];
    }
    
  
    public function store(Request $request, $id)
    {
        // Validação dos dados recebidos
        //dd($request->all());
        $validated = $request->validate([
            'necessidadeLiquidaDias' => 'required|numeric',
            'caixaMinimo' => 'required|numeric',
            'capital_giro' => 'required|numeric',
            'estoque_inicial' => 'required|numeric',
        ]);
        
    
        Log::info($validated);

        try { 
            caixa_minimo::create([
                'id_plano' => $id,
                'necessidade_estoque' => $validated['necessidadeLiquidaDias'],
                'capital_giro' => $validated['capital_giro'],
                'estoque_inicial' => $validated['estoque_inicial'], // Salvando capital de giro no banco
            ]);
    
            return redirect()->route('investimento-total', [$id])
            ->with('success', 'Depreciações salvas com sucesso.');
        } catch (\Exception $e) {
            Log::error('Erro ao salvar caixa mínimo: ' . $e->getMessage());
            return redirect()->back()->withErrors('Erro ao salvar caixa mínimo');
        }
    }
    
    
}

