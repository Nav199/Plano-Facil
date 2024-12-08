<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Plano;
use App\Service\ServiceGemini;
use Illuminate\Support\Facades\Log;

use function Laravel\Prompts\error;

class RelatorioController extends Controller
{
    public function create($id)
    {
        // Carregar os dados do plano com os relacionamentos necessários
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
            'marketing'
        ])->find($id);

        // Verificar se existe um plano e se há dados nos relacionamentos
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
            $plano->marketing->isNotEmpty()
        );

        // Definir mensagem de erro caso não existam dados
        $message = $hasData
            ? null
            : 'Não há dados disponíveis para exibir neste plano.';

        // Chama a análise da IA
        $dados = $this->analise_IAs($plano);
        Log::info('Resposta da API Gemini', ['response' => $dados]);

        return Inertia::render('Relatorio/Relatorio', [
            'status' => session('status'),
            'plano' => $plano,
            'aiAnalysis' => $dados, // Incluindo a análise da IA
            'message' => $message,
        ]);
    }

    public function analise_IAs($plano)
    {
        $dados = $plano->toArray();
        $prompt = "Analise a viabilidade do plano de negócio se o plano de negócios é viável ou não. Deve ter o seguinte campo de Viabilidade";
    
        $service = new ServiceGemini();
        $response = $service->analyze($dados, $prompt);
    
        // Verifica se a chave 'response' existe na resposta
        if (!isset($response['response'])) {
            Log::error('Resposta da API Gemini não contém a chave "response".', ['response' => $response]);
    
            // Retorna um erro personalizado
            return [
                'response' => [
                    'candidates' => [
                        [
                            'content' => [
                                'text' => 'Erro: A análise não pôde ser gerada. Verifique os dados enviados.'
                            ]
                        ]
                    ]
                ]
            ];
        }
    
        // Formatação do texto
        $response['response']['candidates'] = array_map(function($candidate) {
            $candidate['content']['text'] = $this->parseSwotText($candidate['content']['text']);
            return $candidate;
        }, $response['response']['candidates']);
        return $response;
    }
    
    // Função para formatar o texto e remover os asteriscos
  // Função para formatar o texto e remover os asteriscos
private function parseSwotText($text)
{
    // Estrutura inicial para os dados SWOT
    $sections = [
        'viabilidade' => []
    ];

    // Processamento do texto para dividir por seções (exemplo simplificado)
    $lines = explode("\n", $text);
    $currentSection = null;

    foreach ($lines as $line) {
        // Remove os asteriscos antes de processar
        $line = trim(preg_replace('/^\*\*\s?\*\*/', '', $line)); // Remove o asterisco no início e quaisquer espaços extras

        // Identifica as seções de SWOT
        if (stripos($line, 'viabilidade:') !== false) {
            $currentSection = 'viabilidade';
        } else {    
            // Se não encontrar uma seção válida, registre um erro
            Log::error('Seção não identificada no texto SWOT', ['line' => $line]);
        }
    }

    return $sections;
}

}
