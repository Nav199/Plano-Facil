<?php

namespace App\Http\Controllers;

use App\Models\avaliacao;
use App\Models\Plano;
use App\Service\ServiceGemini;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AvaliacaoController extends Controller
{
    /**
     * Renderiza a página de avaliação.
     */
    public function create($id)
    {
        $avaliacao = $this->analise($id);

        return Inertia::render('Avaliacao/Avaliacao', [
            'status' => session('status'),
            'planoId' => $id,
            'avaliacao' => $avaliacao['avaliacao'] ?? [],
            'error' => $avaliacao['error'] ?? null,
        ]);
    } 

    public function store(Request $request, $id)
    {

        $validated = $request->validate([
            'avaliacao' => 'required|array',
            'avaliacao.*' => 'string', 
        ]);

        $plano = Plano::find($id);
        if (!$plano) {
            return redirect()->back()->withErrors(['error' => 'Plano não encontrado.']);
        }

        foreach ($validated['avaliacao'] as $avaliacaoTexto) {
            avaliacao::create([
                'id_plano' => $id,
                'analise' => $avaliacaoTexto,
            ]);
        }

        return redirect()->route('dashboard')
            ->with('success', 'Avaliação enviada com sucesso!');
    }
 
    public function analise($id)
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
        'mao_obra',
        'investimento_total',
        'indicadores',
        'estoque',
        'analise'
        
    ])->find($id);
 
    if (!$plano) {
        Log::warning("Plano com ID $id não encontrado.");
        return ['error' => 'Plano não encontrado.'];
    }

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
        'Indicadores de Viabilidade'=>$plano->indicadores->toArray(),
        'Estoque do empreendimento' => $plano->estoque->toArray(),
        'Análise do empreendimento'=>$plano->analise->toArray(),
    ];

    $geminiService = new ServiceGemini();
    $prompt = "Crie uma avaliação geral sobre o plano de negócio no seguinte formato:
        {
            \"avaliacao\": [\"...\"]
        }
        Baseie-se nos seguintes dados e diga se o plano é viável ou não: " . json_encode($dados);
        

    $response = $geminiService->analyze($dados, $prompt);

    if (isset($response['error']) && $response['error']) {
        Log::error('Erro ao obter resposta da API Gemini', ['message' => $response['message']]);
        return ['error' => 'Erro ao gerar avaliação.'];
    }

    $avaliacaoDataText = $response['candidates'][0]['content']['parts'][0]['text'] ?? null;

    if ($avaliacaoDataText) {
        
        $cleanedText = preg_replace('/^```json\s*|\s*```$/', '', $avaliacaoDataText);
        $avaliacaoData = json_decode($cleanedText, true);

        if ($avaliacaoData) {
            return $avaliacaoData;
        } else {
            Log::warning('O conteúdo retornado não é um JSON válido.', ['avaliacaoDataText' => $avaliacaoDataText]);
            return ['error' => 'Erro ao interpretar a resposta da IA.'];
        }
    }
 
    Log::warning('Nenhum conteúdo de avaliação retornado.');
    return ['error' => 'Nenhuma avaliação gerada.'];
}

}
