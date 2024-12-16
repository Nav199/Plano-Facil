<?php
namespace App\Service;
use Illuminate\Support\Facades\Log;
class JsonDecode
{
    public function processarAnalise($analiseData)
    {
        Log::info('Dados recebidos em processarAnalise:', ['dados' => $analiseData]);
    
        // Caso a variável seja uma coleção, pegamos o primeiro item
        if ($analiseData instanceof \Illuminate\Database\Eloquent\Collection) {
            $analiseData = $analiseData->first();
        }
    
        if (!$analiseData) {
            return [
                'forcas' => [],
                'fraquezas' => [],
                'oportunidades' => [],
                'ameacas' => [],
                'acoes' => [],
            ];
        }
    
        // Processando os dados do JSON
        $forcas = isset($analiseData->forcas) ? array_map('trim', explode(',', $analiseData->forcas)) : [];
        $fraquezas = isset($analiseData->fraquezas) ? array_map('trim', explode(',', $analiseData->fraquezas)) : [];
        $oportunidades = isset($analiseData->oportunidades) ? array_map('trim', explode(',', $analiseData->oportunidades)) : [];
        $ameacas = isset($analiseData->ameacas) ? array_map('trim', explode(',', $analiseData->ameacas)) : [];
        $acoes = isset($analiseData->acoes) ? array_map('trim', explode(',', $analiseData->acoes)) : [];
    
        Log::info('Dados processados em processarAnalise:', [
            'forcas' => $forcas,
            'fraquezas' => $fraquezas,
            'oportunidades' => $oportunidades,
            'ameacas' => $ameacas,
            'acoes' => $acoes,
        ]);
    
        return [
            'forcas' => $forcas,
            'fraquezas' => $fraquezas,
            'oportunidades' => $oportunidades,
            'ameacas' => $ameacas,
            'acoes' => $acoes,
        ];
    }
    public function processar_avaliacao($avaliacaoData)
{
    // Logando a estrutura completa de dados recebidos
    Log::info('Estrutura completa de dados recebidos em processarAvaliacao:', ['dados' => $avaliacaoData]);

    if ($avaliacaoData instanceof \Illuminate\Database\Eloquent\Collection) {
        // Iterando sobre todos os itens da coleção
        $avaliacaoData = $avaliacaoData->all(); // Obtém todos os itens
    }

    if (!$avaliacaoData) {
        return [
            'descricao' => [],
            'recomendacoes' => [],
        ];
    }

    // Arrays para armazenar as descrições e recomendações
    $descricoes = [];
    $recomendacoes = [];

    // Iterando sobre cada item da coleção
    foreach ($avaliacaoData as $item) {
        $descricao = isset($item->analise) ? trim($item->analise) : '';  // Usando o campo 'analise'

        // Adicionando a descrição e as recomendações aos arrays
        $descricoes[] = $descricao;
    }

    Log::info('Dados processados em processarAvaliacao:', [
        'descricao' => $descricoes
    ]);

    return [
        'descricao' => $descricoes,  // Retorna todas as descrições
    ];
}

    

}

