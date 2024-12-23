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
        // Chama o serviço para obter os dados SWOT
        $swotData = $this->analisarPlanoFrontend($id);
    
        // Verifica se há dados suficientes ou retorna uma mensagem de erro
        if (!$swotData || !isset($swotData['forcas'], $swotData['fraquezas'], $swotData['oportunidades'], $swotData['ameacas'], $swotData['acoes'])) {
            return Inertia::render('Analise/Analise', [
                'swotData' => null,
                'planoId' => $id,
                'error' => 'Dados insuficientes para gerar a análise SWOT. Certifique-se de que todas as informações do plano estão completas.',
            ]);
        }
    
        // Renderiza a página com os dados SWOT
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
            'mao_obra',
            'investimento_total'
            
        ])->find($id);
    
        if (!$plano) {
            Log::warning("Plano com ID $id não encontrado.");
            return null;
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
            return null;
        }
    
       
        $swotDataText = $resultado['candidates'][0]['content']['parts'][0]['text'] ?? null;
    
        if ($swotDataText) {
        
            $cleanedText = preg_replace('/^```json\s*|\s*```$/', '', $swotDataText);
    
            // Tenta decodificar o JSON limpo
            $swotData = json_decode($cleanedText, true);
    
            if ($swotData) {
                return $swotData;
            } else {
                Log::warning('O conteúdo retornado não é um JSON válido.', ['swotDataText' => $swotDataText]);
                return null;
            }
        }
    
        Log::warning('Nenhum conteúdo de análise SWOT retornado.');
        return null;
    }
}
