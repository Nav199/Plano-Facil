<?php

namespace App\Http\Controllers;

use App\Models\analise;
use App\Models\Plano;
use App\Service\ServiceGemini;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AnaliseController extends Controller
{
    /**
     * Exibe a página de análise SWOT.
     */
   public function create($id)
{
    $swotData = $this->analisarPlanoFrontend($id);

    if (isset($swotData['error'])) {
        return Inertia::render('Analise/Analise', [
            'swotData' => null,
            'planoId' => $id,
            'error' => $swotData['error'],
        ]);
    }

    return Inertia::render('Analise/Analise', [
        'swotData' => $swotData,
        'planoId' => $id,
        'error' => null,
    ]);
}


    public function store(Request $request, $id)
    {
        // Validação dos dados recebidos
        $validatedData = $request->validate([ 
            'swotData' => 'required|array',
            'swotData.forcas' => 'required|array',
            'swotData.fraquezas' => 'required|array',
            'swotData.oportunidades' => 'required|array',
            'swotData.ameacas' => 'required|array',
            'swotData.acoes' => 'required|array',
        ]);

        $forcasString = implode(", ", $validatedData['swotData']['forcas']);
        $fraquezasString = implode(", ", $validatedData['swotData']['fraquezas']);
        $oportunidadesString = implode(", ", $validatedData['swotData']['oportunidades']);
        $ameacasString = implode(", ", $validatedData['swotData']['ameacas']);
        $acoesString = implode(", ", $validatedData['swotData']['acoes']);

        
        analise::create([
            'id_plano' => $id,
            'forcas' => $forcasString,  
            'fraquezas' => $fraquezasString,  
            'oportunidades' => $oportunidadesString,  
            'ameacas' => $ameacasString, 
            'acoes' => $acoesString,  
        ]);

        return redirect()->route('avaliacao', [$id])
        ->with('success', 'Estoque salvo com sucesso.');
    }

    /**
     * Processa e retorna os dados para análise SWOT.
     */
    public function analisarPlanoFrontend($id) 
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
        'demonstrativo',
        'socios', 
        'capital_giro',
        'investimento_total'
    ])->find($id);

    if (!$plano) {
        Log::warning("Plano com ID $id não encontrado.");
        return ['error' => 'Plano não encontrado'];
    }

    // 🔎 Lista de tabelas relacionadas que devem estar completas
    $requiredRelations = [
        'executivos' => 'Plano executivo',
        'veiculo' => 'Veículo',
        'maquina' => 'Máquina',
        'imoveis' => 'Imóveis',
        'equipamento' => 'Equipamento',
        'Forma' => 'Forma',
        'investimento_pre' => 'Investimento Pré-operacional',
        'Faturamento' => 'Faturamento',
        'clientes' => 'Clientes',
        'concorrentes' => 'Concorrentes',
        'fornecedores' => 'Fornecedores',
        'marketing' => 'Marketing',
        'apuracao' => 'Apuração de custos',
        'custo_fixo' => 'Custo fixo',
        'demonstrativo' => 'Demonstrativo de resultados',
        'socios' => 'Sócios',
        'capital_giro' => 'Capital de giro',
        'investimento_total' => 'Investimento total'
    ];

    $incompleteTables = [];

    foreach ($requiredRelations as $relation => $label) {
        if (!$plano->$relation || $plano->$relation->isEmpty()) {
            $incompleteTables[] = $label;
        }
    }

    // Se faltar alguma tabela, retorna erro
    if (!empty($incompleteTables)) {
        return [
            'error' => 'As seguintes tabelas estão incompletas: ' . implode(', ', $incompleteTables)
        ];
    }

    // Se está tudo certo, monta os dados
    $dados = [
        'nome do empreendimento' => $plano->nome,
        'Plano executivo' => $plano->executivos->toArray(),
        'veiculo do empreendimento' => $plano->veiculo->toArray(),
        'faturamento do empreendimento' => $plano->Faturamento->toArray(),
        'mao de obra do empreendimento'=> $plano->mao_obra->toArray(),
        'apuração de custo do empreendimento'=> $plano->apuracao->toArray(),
        'Demonstrativo de resultados do empreendimento'=> $plano->demonstrativo->toArray(),
        'Custo Fixo do empreendimento'=> $plano->custo_fixo->toArray(),
        'Marketing do empreendimento'=> $plano->marketing->toArray(),
        'Clientes do empreendimento'=> $plano->clientes->toArray(),
        'Concorrentes do empreendimento'=> $plano->concorrentes->toArray(),
        'Fornecedores do empreendimento '=> $plano->fornecedores->toArray(),
        'Forma do empreendimento'=> $plano->Forma->toArray(),
        'Socios do empreendimento'=> $plano->socios->toArray(),
        'Investimento Pré operacional do empreendimento'=> $plano->investimento_pre->toArray(),
        'Capital de Giro do empreendimento'=>$plano->capital_giro->toArray(),
        'Investimento total do empreendimento'=>$plano->investimento_total->toArray(),
    ];

    $geminiService = new ServiceGemini();
    $prompt = "Crie uma análise SWOT estruturada no seguinte formato JSON:
    {
        \"forcas\": [\"...\"],
        \"fraquezas\": [\"...\"],
        \"oportunidades\": [\"...\"],
        \"ameacas\": [\"...\"],
        \"acoes\": [\"...\"]
    }
    Baseie-se nos seguintes dados: " . json_encode($dados);

    $resultado = $geminiService->analyze($dados, $prompt);

    if (isset($resultado['error']) && $resultado['error']) {
        Log::error('Erro ao obter resposta da API Gemini', ['message' => $resultado['message']]);
        return ['error' => 'Erro ao processar análise SWOT'];
    }

    $swotDataText = $resultado['candidates'][0]['content']['parts'][0]['text'] ?? null;

    if ($swotDataText) {
        $cleanedText = preg_replace('/^```json\s*|\s*```$/', '', $swotDataText);
        $swotData = json_decode($cleanedText, true);

        if ($swotData) {
            return $swotData;
        } else {
            Log::warning('O conteúdo retornado não é um JSON válido.', ['swotDataText' => $swotDataText]);
            return ['error' => 'O Gemini não retornou dados válidos.'];
        }
    }

    Log::warning('Nenhum conteúdo de análise SWOT retornado.');
    return ['error' => 'Nenhum dado retornado para análise SWOT'];
}
}
