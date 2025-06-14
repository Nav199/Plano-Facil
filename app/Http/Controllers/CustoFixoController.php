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
        $validated = $request->validate([
            'custos' => 'required|array',
            'custos.*.descricao' => 'required|string',
            'custos.*.valor' => 'nullable|string',
            'crescimento' => 'nullable|numeric',
            'total' => 'nullable|numeric'
        ]);
    
        $total = 0;
    
        foreach ($validated['custos'] as $custo) {
            // Converte o valor para número (caso venha como string com vírgula)
            $valorNumerico = isset($custo['valor']) ? floatval(str_replace(',', '.', preg_replace('/[^\d,]/', '', $custo['valor']))) : 0;
    
            $total += $valorNumerico;
    
            CustoFixo::create([
                'id_plano' => $id,
                'descricao' => $custo['descricao'],
                'custo' => $valorNumerico,
                'crescimento' => $validated['crescimento'] ?? 0,
                'total' => $total
            ]);
        }
    
        return redirect()->route('caixa', [$id])->with('status', 'Custos fixos salvos com sucesso!');
    }
    
    /**
     * Lista o valor total de salários para o plano de negócios especificado.
     */
    public function listar_salario($id)
    {
        $totalSalarios = DB::table('mao_obra')
            ->where('id_plano', $id)
            ->sum('total');

        return $totalSalarios;
    }

    /**
     * Lista o valor total de depreciação mensal para o plano de negócios especificado.
     */
    public function listar_depre($id)
    {
        $totalDepreciacao = DB::table('depreciacao')
            ->where('id_plano', $id)
            ->sum('mensal');

        return $totalDepreciacao;
    }
}
