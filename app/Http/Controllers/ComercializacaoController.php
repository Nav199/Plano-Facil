<?php

namespace App\Http\Controllers;

use App\Models\Comercializacao;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Service\CnaeService;

class ComercializacaoController extends Controller
{
    protected $cnaeService;

    public function __construct(CnaeService $cnaeService)
    {
        $this->cnaeService = $cnaeService;
    }

    // Controller de Comercialização
    public function create($id)
    {
        // Chama as funções para obter faturamento e impostos
        $faturamento = $this->listar_faturamento($id);
        $aliquota = $this->verifica_imposto($id);        
        
        // Passando os dados para a view
        return Inertia::render('Comer', [
            'planoId' => $id,
            'totalFaturamento' => $faturamento['total'], 
            'aliquota' => $aliquota,  // Envia a alíquota de imposto
            'status' => session('status')
        ]);
    }
    

    public function store(Request $request, $id)
{
    // Validação dos dados
    //dd($request->all());
    $validatedData = $request->validate([
        'gastosVendas' => 'required|array',
        'gastosVendas.*.descricao' => 'required|string',
        'gastosVendas.*.percentual' => 'required|numeric',
        'gastosVendas.*.faturamentoEstimado' => 'required|numeric',
        'gastosVendas.*.custoTotal' => 'required|numeric',
    ]);

    // Criar registros na tabela 'comercializacao'
    foreach ($validatedData['gastosVendas'] as $gasto) {
        Comercializacao::create([
            'id_plano' => $id,
            'total_impostos' => $gasto['custoTotal'], 
            'total_gastos_vendas' => $gasto['faturamentoEstimado'], 
            'total_geral' => $gasto['custoTotal'] + $gasto['faturamentoEstimado'], 
        ]);
    }

    return redirect()->route('apuracao', [$id]); // Redireciona para outra página
}



    public function listar_faturamento($id) // função para retornar o faturamento
    {
        $detalhesFaturamento = DB::table('faturamento')
            ->select('id', 'produto', 'quantidade', 'valor_unitario', DB::raw('quantidade * valor_unitario AS total'))
            ->where('id_plano', $id)
            ->get(); 

        $totalFaturamento = $detalhesFaturamento->sum('total');

        return [
            'detalhes' => $detalhesFaturamento,
            'total' => $totalFaturamento
        ];
    }

    public function verifica_imposto($id)
    {
        
        $setorAtividade = DB::table('executivo')
            ->where('id_plano', $id)
            ->value('setor_atividade');

    
        $cnaeData = $this->cnaeService->getCnaeData();

 
        foreach ($cnaeData as $cnae) {
            if ($cnae['Descrição'] === $setorAtividade) {
                return $cnae['Alíquota'];
            }
        }

        return null; 
    }
}
