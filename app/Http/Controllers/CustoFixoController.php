<?php

namespace App\Http\Controllers;

use App\Models\CustoFixo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class CustoFixoController extends Controller
{
    /**
     * Renderiza o formulário de custos fixos com os valores de salários e depreciação carregados.
     */
    public function create($id)
    {
        $salario = $this->listar_salario($id); // Obtem o valor total de salários
        $depreciacao = $this->listar_depre($id); // Obtem o valor total de depreciação

        return Inertia::render('CustosFixos', [
            'Salario' => $salario,
            'Depreciacao' => $depreciacao,
            'planoId' => $id,
            'status' => session('status')
        ]);
    }

    /**
     * Processa e armazena os dados de custos fixos enviados pelo formulário.
     */
    public function store(Request $request, $id)
    {
        // Validação dos dados enviados
        //dd($request->all());
        $validated = $request->validate([
            'custos' => 'required|array',
            'custos.*.descricao' => 'required|string',
            'custos.*.valor' => 'nullable|string', 
            'crescimento' => 'nullable|numeric',   
            'total'=>'nullable|numeric'
        ]);
    
       
        foreach ($validated['custos'] as $custo) {
            // Remove os caracteres "R$", espaços e vírgulas para limpar o valor
            $valorLimpo = preg_replace('/[^\d.-]/', '', $custo['valor']); // Mantém apenas números e ponto/menos
    
            // Verifica se o valor está vazio, se sim, define como 0
            $valorNumerico = $valorLimpo ? (float) $valorLimpo : 0;
    
            CustoFixo::create([
                'id_plano' => $id,
                'descricao' => $custo['descricao'],
                'custo' => $valorNumerico, // Armazena o valor numérico
                'crescimento' => $validated['crescimento'] ?? 0, // Crescimento padrão 0
                'total' => $validated['total']
            ]);
        }
    
        return redirect()->route('caixa', [$id])->with('status', 'Custos fixos salvos com sucesso!');
    }
    
    /**
     * Lista o valor total de salários para o plano de negócios especificado.
     */
    public function listar_salario($id)
    {
        // Soma o total da coluna 'total' na tabela 'mao_obra' para o plano especificado
        $totalSalarios = DB::table('mao_obra')
            ->where('id_plano', $id)
            ->sum('total'); // Retorna a soma de todos os valores de salários

        return $totalSalarios; // Retorna como numérico
    }

    /**
     * Lista o valor total de depreciação mensal para o plano de negócios especificado.
     */
    public function listar_depre($id)
    {
        // Soma o valor da coluna 'mensal' na tabela 'depreciacao' para o plano especificado
        $totalDepreciacao = DB::table('depreciacao')
            ->where('id_plano', $id)
            ->sum('mensal'); // Soma os valores de depreciação mensal

        return $totalDepreciacao; // Retorna como numérico
    }
}
