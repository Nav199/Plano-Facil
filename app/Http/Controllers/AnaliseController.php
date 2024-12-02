<?php

namespace App\Http\Controllers;

use App\Models\Plano;
use App\Service\ServiceGemini;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class AnaliseController extends Controller
{
    /**
     * Exibe a página de análise SWOT.
     */
    public function create($id)
    {
        $swotData = $this->analisarPlanoFrontend($id);

        if (!$swotData) {
            return Inertia::render('Analise/Analise', [
                'swotData' => null,
                'planoId' => $id,
                'error' => 'Dados insuficientes para gerar análise SWOT.',
            ]);
        }

        return Inertia::render('Analise/Analise', [
            'swotData' => $swotData,
            'planoId' => $id,
            'error' => null,
        ]);
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
        ])->find($id);

        if (!$plano) {
            Log::warning("Plano com ID $id não encontrado.");
            return null;
        }

        $missingTables = [];
        $relations = [
            'executivos' => $plano->executivos,
            'veiculo' => $plano->veiculo,
            'maquina' => $plano->maquina,
            'imoveis' => $plano->imoveis,
            'equipamento' => $plano->equipamento,
            'forma' => $plano->Forma,
            'investimento_pre' => $plano->investimento_pre,
            'faturamento' => $plano->Faturamento,
        ];

        foreach ($relations as $relation => $data) {
            if (empty($data)) {
                $missingTables[] = $relation;
            }
        }

        if (!empty($missingTables)) {
            Log::warning('Tabelas faltantes detectadas:', ['missing_tables' => $missingTables]);
            return null;
        }

        $dados = [
            'nome' => $plano->nome,
            'executivos' => $plano->executivos->toArray(),
            'veiculo' => $plano->veiculo->toArray(),
            'faturamento' => $plano->Faturamento->toArray(),
        ];

        $dados = $this->convertToSupportedFormat($dados);

        $geminiService = new ServiceGemini();
        $resultado = $geminiService->analyze($dados, "Crie uma análise SWOT com os campos FATORES INTERNOS PONTOS FORTES, PONTOS FRACOS, FATORES EXTERNOS OPORTUNIDADES, AMEAÇAS, AÇÕES ESTRATÉGICAS");

        if (isset($resultado['error']) && $resultado['error']) {
            Log::error('Erro ao obter resposta da API Gemini', ['message' => $resultado['message']]);
            return null;
        }

        $swotData = $resultado['candidates'][0]['content']['parts'][0]['text'] ?? null;

        Log::error('Resposta da API Gemini', ['response' => $swotData]);

        return $swotData ? json_decode($swotData, true) : null;
    }

    /**
     * Converte os dados para um formato suportado.
     */
    private function convertToSupportedFormat($data)
    {
        if (is_object($data)) {
            return $data->toArray();
        } elseif (is_array($data)) {
            return array_map(fn($item) => $this->convertToSupportedFormat($item), $data);
        } elseif (is_scalar($data) || is_null($data)) {
            return $data;
        } else {
            throw new \Exception('Tipo de dado não suportado: ' . gettype($data));
        }
    }
}
