<?php

namespace App\Http\Controllers;

use App\Models\Apuracao;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class ApuracaoController extends Controller
{

    public function create ($id)
    {
        $faturamento = $this->faturamento($id);
        $custoUnitario = $this->custoUnitario($id);

        return Inertia::render('Apu_custo',[
            'planoId' => $id,
            "status"=> session('status'),
            'faturamento'=>$faturamento,
            'custoUnitario'=>$custoUnitario
        ]);
    }
 
    public function store(Request $request, $id)
{
    // Validação dos dados recebidos
    $validated = $request->validate([
        'items' => 'required|array',
        'items.*.descricao' => 'required|string|max:255',
        'items.*.vendas' => 'required|numeric|min:0',
        'items.*.custo' => 'required|numeric|min:0',
        'crescimento' => 'required|numeric|min:0',
    ]);


    foreach ($validated['items'] as $item) {
        Apuracao::create([
            'id_plano' => $id,
            'descricao' => $item['descricao'],
            'vendas' => $item['vendas'],
            'custo' => $item['custo'],
            'crescimento' => $validated['crescimento']
        ]);
    }
    return redirect()->route('mao-obra', [$id])
    ->with('success', 'Estoque salvo com sucesso.');
}


public function custoUnitario($id)
{
    // Join entre as tabelas custo_unitario e plano de negócios, filtrando pelo id_plano
    $custoUnitario = DB::table('custo_unitario')
    ->select(
        'id',
        'id_plano',
        'material',
        'quantidade',
        'valor_untario',
        'total',
        'total_geral',
        'created_at',
        'updated_at',
        DB::raw('valor_unitario AS custo')
    )
    ->where('id_plano', $id)
    ->get();

    
    return $custoUnitario;
}


    // Método para buscar os dados de Faturamento
    public function faturamento($id)
    {
        // Join entre as tabelas de faturamento e plano de negócios, filtrando pelo id_plano
        $faturamento = DB::table('faturamento')
            ->where('faturamento.id_plano', $id)
            ->select(
                'faturamento.produto as produto_servico',  
                'faturamento.quantidade as estimativa_vendas',  
                'faturamento.valor_unitario',  
                'faturamento.total as total_faturamento'  
            )
            ->get();
        return $faturamento;
    }
}
