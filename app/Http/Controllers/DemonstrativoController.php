<?php

namespace App\Http\Controllers;
 
use App\Models\Demonstrativo;
use App\Models\investimento_total;
use App\Models\Apuracao;
use App\Models\CustoFixo;
use App\Models\Faturamento;
use App\Models\Comercializacao;
use App\Models\indicadores;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
 
class DemonstrativoController extends Controller
{
    public function create($id)
    {
        return Inertia::render('Demonstrativo', [
            'planoId' => $id,
            'faturamento' => $this->listar_faturamento($id),
            'apuracao' => $this->listar_apuracao($id),
            'custo_fixo' => $this->listar_custos_fixos($id),
            'gastos_vendas' => $this->listar_gastos_vendas($id),
            'investimento' => $this->listar_capital($id),
            'status' => session('status'),
        ]);
    }
    
    public function store(Request $request, $id)
    {
        // Validação dos dados recebidos
        $validated = $request->validate([
            'resumo' => 'required|array',
            'resumo.*.descricao' => 'required|string',
            'resumo.*.valor' => 'required|numeric',
            'resumo.*.anual' => 'required|numeric',
            'resumo.*.percentual' => 'required|numeric',

            'indicadores.lucrabilidade_mensal' => 'required|numeric',
            'indicadores.lucrabilidade_anual' => 'required|numeric',
            'indicadores.rentabilidade_mensal' => 'required|numeric',
            'indicadores.rentabilidade_anual' => 'required|numeric',
            'indicadores.ponto_equilibrio_mensal' => 'required|numeric',
            'indicadores.ponto_equilibrio_anual' => 'required|numeric',
            'indicadores.roi_mensal' => 'required|numeric',
            'indicadores.roi_anual' => 'required|numeric',
        ]);
        // Extração dos valores principais
        $resumo = collect($validated['resumo']);
        $receita = $resumo->firstWhere('descricao', 'Receita Total com Vendas')['valor'] ?? 0;
        $cmv = $resumo->firstWhere('descricao', 'Custos com Materiais Diretos e/ou CMV')['valor'] ?? 0;
        $gastosVendas = $resumo->firstWhere('descricao', 'Gastos com Vendas')['valor'] ?? 0;
        $custosFixos = $resumo->firstWhere('descricao', 'Custos Fixos Totais')['valor'] ?? 0;

        // Cálculo seguro do lucro e percentual
        $margem = $receita - ($cmv + $gastosVendas);
        $lucro_operacional = $margem - $custosFixos;
        $percentual_lucro = $receita > 0 ? ($lucro_operacional / $receita) * 100 : 0;

        // Criação do Demonstrativo
        Demonstrativo::create([
            'id_plano' => $id,
            'resumo' => $validated['resumo'], // Armazenar a DRE
            'resultado_operacional' => round($lucro_operacional, 2),
            'lucro_mensal' => round($lucro_operacional, 2), // Pode ajustar se desejar
            'porcentagem_lucro' => round($percentual_lucro, 2),
        ]);

        // Criação dos Indicadores
     Indicadores::create([
        'id_plano' => $id,
        'lucrabilidade_mensal' => round($validated['indicadores']['lucrabilidade_mensal'], 2),
        'lucrabilidade_anual' => round($validated['indicadores']['lucrabilidade_anual'], 2),
        'ponto_equilibrio_mensal' => round($validated['indicadores']['ponto_equilibrio_mensal'], 6),
        'ponto_equilibrio_anual' => round($validated['indicadores']['ponto_equilibrio_anual'], 6),
        'rentabilidade_mensal' => round($validated['indicadores']['rentabilidade_mensal'], 2),
        'rentabilidade_anual' => round($validated['indicadores']['rentabilidade_anual'], 2),
        'roi_mensal' => round($validated['indicadores']['roi_mensal'], 2),
        'roi_anual' => round($validated['indicadores']['roi_anual'], 2),
    ]);

        return redirect()->route('analise', [$id])->with('success', 'Demonstrativo e indicadores salvos com sucesso.');
    }
    

    public function listar_faturamento($id)
{
    $detalhesFaturamento = Faturamento::where('id_plano', $id)->get();

    $crescimento = floatval($detalhesFaturamento->first()->crescimento ?? 0);

    $calculosService = new \App\Service\CalculosService();
    $faturamento = $calculosService->calcular12Meses(
        $detalhesFaturamento,
        $crescimento,
        function ($item) {
            return $item->quantidade * $item->valor_unitario;
        }
    );

    return [
        'detalhes' => $detalhesFaturamento,
        'total' => $faturamento['totalSemCrescimento'],
        'crescimento_faturamento' => $crescimento,
        'faturamento_anual' => $faturamento['total12Meses'],
    ];
}


   public function listar_apuracao($id)
{
    $detalhesApuracao = Apuracao::where('id_plano', $id)->get();

    $crescimento = floatval($detalhesApuracao->first()->crescimento ?? 0);

    $calculosService = new \App\Service\CalculosService();
    $apuracao = $calculosService->calcular12Meses(
        $detalhesApuracao,
        $crescimento,
        function ($item) {
            return $item->vendas * $item->custo;
        }
    ); 

    return [
        'detalhes' => $detalhesApuracao,
        'total' => $apuracao['totalSemCrescimento'],
        'apuracao_anual' => $apuracao['total12Meses'],
    ];
}


   public function listar_custos_fixos($id)
{
    $detalhesCustosFixos = CustoFixo::where('id_plano', $id)->get();

    $crescimento = floatval($detalhesCustosFixos->first()->crescimento ?? 0);

    $calculosService = new \App\Service\CalculosService();
    $custosFixos = $calculosService->calcular12Meses(
        $detalhesCustosFixos,
        $crescimento,
        function ($item) {
            return $item->custo;
        }
    );

    return [
        'detalhes' => $detalhesCustosFixos,
        'total' => $custosFixos['totalSemCrescimento'],
        'custosFixosAnuais' => $custosFixos['total12Meses'],
    ];
}

    public function listar_gastos_vendas($id)
{
    $gastosVendas = Comercializacao::where('id_plano', $id)->get();
    
    $crescimento = floatval($gastosVendas->first()->crescimento ?? 0);

    $calculosService = new \App\Service\CalculosService();
    $gastosVendasCalculados = $calculosService->calcular12Meses(
        $gastosVendas,
        $crescimento,
        function ($item) {
            return $item->total_gastos_vendas;
        }
    );

    // Adiciona 1% ao valor anual dos gastos com vendas
    $gastosVendasCalculados['total12Meses'] *= 1.01;

    return [
        'detalhes' => $gastosVendas,
        'total' => $gastosVendasCalculados['totalSemCrescimento'],
        'gastosAnuais' => $gastosVendasCalculados['total12Meses'],
    ];
}

    
    public function listar_capital($id)
    {
        $detalhesCapital = investimento_total::where('id_plano', $id)->get();

        return [
        'detalhes' => $detalhesCapital,
        'total' => $detalhesCapital->first()->total_investimento ?? 0,
         ];
    }
}
