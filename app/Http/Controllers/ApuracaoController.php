<?php

namespace App\Http\Controllers;

use App\Models\Apuracao;
use App\Models\Custo_Unitario;
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
            'status'=> session('status'),
            'faturamento'=>$faturamento,
            'custoUnitario'=>$custoUnitario
        ]);
    }
 
    public function store(Request $request, $id)
{
    
    //dd($request->all());
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
            'crescimento' => $validated['crescimento'],
            'total'=> $item['vendas'] * $item['custo']
        ]);
    }
    return redirect()->route('mao-obra', [$id])
    ->with('success', 'Estoque salvo com sucesso.');
}

public function custoUnitario($id)
{
    $custoUnitario = Custo_Unitario::where('id_plano', $id)->get();

    if (!$custoUnitario) {
        return null;
    }
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
