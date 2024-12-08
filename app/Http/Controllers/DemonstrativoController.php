<?php

namespace App\Http\Controllers;

use App\Models\Demonstrativo;
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
            'gastos_vendas' => $this->listar_gastos_vendas($id), // Adicionado
            'status' => session('status'),
        ]);
    }
    
    public function store(Request $request, $id)
    {
        $validated = $request->validate([
            'lucro_operacional' => 'required|numeric',
            'lucro_anual' => 'required|numeric',
            'porcentagem' => 'required|numeric',
        ]);
    
        Demonstrativo::create([
            'id_plano' => $id,
            'resultado_operacional' => $validated['lucro_operacional'],
            'lucro_mensal' => $validated['lucro_anual'],
            'porcentagem_lucro' => $validated['porcentagem'],
        ]);
    
        return redirect()->route('analise', [$id])->with('success', 'Demonstrativo salvo com sucesso.');
    }
    

    public function listar_faturamento($id)
    {
        $detalhesFaturamento = DB::table('faturamento')
            ->select('id', 'produto', 'quantidade', 'valor_unitario', 'crescimento', DB::raw('quantidade * valor_unitario AS total'))
            ->where('id_plano', $id)
            ->get();

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
        $detalhesApuracao = DB::table('apuracao')
            ->select('id', 'descricao', 'vendas', 'custo', 'crescimento', DB::raw('vendas * custo AS total'))
            ->where('id_plano', $id)
            ->get();

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
        $detalhesCustosFixos = DB::table('custofixo')
            ->select('id', 'id_plano', 'descricao', 'custo', 'crescimento', DB::raw('custo AS total'))
            ->where('id_plano', $id)
            ->get();

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
        $gastosVendas = DB::table('comercializacao')
            ->select(
                'id',
                'id_plano',
                'total_impostos',
                'total_gastos_vendas',
                'total_geral',
                'created_at',
                'updated_at',
                DB::raw('total_gastos_vendas AS total')
            )
            ->where('id_plano', $id)
            ->get();
    
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
    


}
