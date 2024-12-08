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
            'avaliacao' => $avaliacao['avaliacao'] ?? [], // Envia o array de avaliação ou um array vazio
            'error' => $avaliacao['error'] ?? null,
        ]);
    } 

    public function store(Request $request, $id)
    {
        // Validação dos dados recebidos
        $validated = $request->validate([
            'avaliacao' => 'required|array', // O campo 'avaliacao' deve ser um array
            'avaliacao.*' => 'string', // Cada item da avaliação deve ser uma string
        ]);

        // Verifica se o plano com o ID fornecido existe
        $plano = Plano::find($id);
        if (!$plano) {
            return redirect()->back()->withErrors(['error' => 'Plano não encontrado.']);
        }

        // Armazenar cada avaliação no banco de dados
        foreach ($validated['avaliacao'] as $avaliacaoTexto) {
            avaliacao::create([
                'id_plano' => $id,
                'analise' => $avaliacaoTexto,
            ]);
        }

        // Retornar sucesso ou redirecionar com uma mensagem
        return redirect()->route('/dashboard')
            ->with('success', 'Avaliação enviada com sucesso!');
    }
    /**
     * Gera e retorna a avaliação do plano usando IA.
     */
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
        'analise'
    ])->find($id);

    if (!$plano) {
        Log::warning("Plano com ID $id não encontrado.");
        return ['error' => 'Plano não encontrado.'];
    }

    $dados = [
        'nome' => $plano->nome,
        'executivos' => $plano->executivos->toArray(),
        'veiculo' => $plano->veiculo->toArray(),
        'faturamento' => $plano->Faturamento->toArray(),
        'analise' => $plano->analise->toArray(),
    ];

    $geminiService = new ServiceGemini();
    $prompt = "Crie uma avaliação sobre o plano de negócio no seguinte formato JSON:
    {
        \"avaliacao\": [\"...\"]
    }
    Baseie-se nos seguintes dados: " . json_encode($dados);

    $response = $geminiService->analyze($dados, $prompt);

    if (isset($response['error']) && $response['error']) {
        Log::error('Erro ao obter resposta da API Gemini', ['message' => $response['message']]);
        return ['error' => 'Erro ao gerar avaliação.'];
    }

    $avaliacaoDataText = $response['candidates'][0]['content']['parts'][0]['text'] ?? null;

    if ($avaliacaoDataText) {
        // Remove marcações de bloco de código e decodifica JSON
        $cleanedText = preg_replace('/^```json\s*|\s*```$/', '', $avaliacaoDataText);
        $avaliacaoData = json_decode($cleanedText, true);

        if ($avaliacaoData) {
            return $avaliacaoData; // Retorna os dados diretamente
        } else {
            Log::warning('O conteúdo retornado não é um JSON válido.', ['avaliacaoDataText' => $avaliacaoDataText]);
            return ['error' => 'Erro ao interpretar a resposta da IA.'];
        }
    }

    Log::warning('Nenhum conteúdo de avaliação retornado.');
    return ['error' => 'Nenhuma avaliação gerada.'];
}

}
