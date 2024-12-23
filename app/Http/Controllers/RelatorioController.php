<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Plano;
use App\Service\JsonDecode;
use Illuminate\Support\Facades\Log;

class RelatorioController extends Controller
{
    protected $JsonDecode;

    public function __construct(JsonDecode $JsonDecode)
    {
        $this->JsonDecode = $JsonDecode;
    }

    public function create($id)
    {
        $plano = Plano::with([
            'executivos',
            'veiculo',
            'maquina',
            'imoveis',
            'equipamento',
            'Forma',
            'investimento_pre',
            'Faturamento',
            'clientes',
            'concorrentes',
            'fornecedores',
            'marketing',
            'apuracao',
            'custo_fixo',
            'analise',
            'avaliacao',
            'demonstrativo',
            'socios',
            'forma',
            'depreciacao',
            'custo_unitario',
            'investimento_total'
        ])->find($id);

        $hasData = $plano && (
            $plano->executivos->isNotEmpty() ||
            $plano->veiculo->isNotEmpty() ||
            $plano->maquina->isNotEmpty() ||
            $plano->imoveis->isNotEmpty() ||
            $plano->equipamento->isNotEmpty() ||
            $plano->Forma->isNotEmpty() ||
            $plano->investimento_pre->isNotEmpty() ||
            $plano->Faturamento->isNotEmpty() ||
            $plano->clientes->isNotEmpty() ||
            $plano->concorrentes->isNotEmpty() ||
            $plano->fornecedores->isNotEmpty() ||
            $plano->marketing->isNotEmpty() ||
            $plano->apuracao->isNotEmpty() ||
            $plano->analise->isNotEmpty() ||
            $plano->avaliacao->isNotEmpty() ||
            $plano->custo_fixo->isNotEmpty()||
            $plano->demonstrativo->isNotEmpty() ||
            $plano->socios->isNotEmpty()
        ); 
        Log::info($plano->analise);
        Log::info($plano->avaliacao);
 
        $analise = $this->JsonDecode->processarAnalise($plano->analise);
        $avaliacao = $this->JsonDecode->processar_avaliacao($plano->avaliacao);

        Log::info($analise);
        Log::info($avaliacao);

        $message = $hasData 
            ? null
            : 'Não há dados disponíveis para exibir neste plano.';

        return Inertia::render('Relatorio/Relatorio', [
            'status' => session('status'),
            'plano' => $plano,
            'analise' => $analise,
            'avaliacao'=>$avaliacao,
            'message' => $message,
        ]);
    }
}
