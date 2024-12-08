<?php

namespace App\Service;

class CalculosService
{
    // Função para calcular o total de cada categoria de investimento do Investimento Fixo
    public function calcularSubtotal($itens)
    {
        return array_reduce($itens, function ($total, $item) {
            return $total + ($item['quantidade'] * $item['valorUnitario']);
        }, 0);
    }

    // Função para calcular o total geral de todas as categorias do Investimento Fixo
    public function calcularTotal($imoveis, $maquinas, $equipamentos, $veiculos, $moveisUtensilios, $computadores)
    {
        return $this->calcularSubtotal($imoveis) +
               $this->calcularSubtotal($maquinas) +
               $this->calcularSubtotal($equipamentos) +
               $this->calcularSubtotal($veiculos) +
               $this->calcularSubtotal($moveisUtensilios) +
               $this->calcularSubtotal($computadores);
    }


    //função para calcular o Estoque 

    public function calcular_estoque($item)
    {
        return array_map(function ($item){
            $item['total'] = $item['quantidade']*$item['valorUnitario'];
            return $item;
        }, $item);
    }

    public function total_estoque($itens) //função para calcular o total geral do estoque
    {
        return array_reduce($itens, function ($total, $item) {
            return $total + $item['total'];
        }, 0);
    }
 
    
    public function processarFatura($items, $crescimento)
    {
        // Calcular subtotais para cada item
        $itensCalculados = array_map(function ($item) {
            $item['total'] = $item['quantidade'] * $item['valor'];
            return $item;
        }, $items);

        // Calcular o total sem crescimento
        $totalSemCrescimento = array_reduce($itensCalculados, function ($total, $item) {
            return $total + $item['total'];
        }, 0);

        // Aplicar crescimento percentual no total
        $crescimentoDecimal = 1 + ($crescimento / 100);
        $totalComCrescimento = $totalSemCrescimento * $crescimentoDecimal;

        return [
            'itens' => $itensCalculados,
            'totalSemCrescimento' => $totalSemCrescimento,
            'totalComCrescimento' => $totalComCrescimento
        ];
    }

    public function calcular12Meses($itens, $crescimento, $calculoCallback)
    {
        // Converter itens para array caso seja Collection
        $itensArray = $itens instanceof \Illuminate\Support\Collection ? $itens->toArray() : $itens;

        // Total inicial sem crescimento
        $totalSemCrescimento = array_reduce($itensArray, function ($total, $item) use ($calculoCallback) {
            return $total + $calculoCallback($item); // Usar o cálculo específico para cada item
        }, 0);

        // Aplicar crescimento percentual (composto) no total
        $crescimentoDecimal = 1 + ($crescimento / 100);
        $total12Meses = $totalSemCrescimento * ($crescimentoDecimal ** 12);

        return [
            'totalSemCrescimento' => $totalSemCrescimento,
            'total12Meses' => $total12Meses,
        ];
    }
    
    public function calcularIndicadores($faturamento, $apuracao, $custoFixo, $gastosVendas, $crescimento = 1.05, $periodos = 5)
    {
        // Dados iniciais
        $totalFaturamento = $faturamento['total'] ?? 0;
        $totalApuracao = $apuracao['total'] ?? 0;
        $totalCustosFixos = $custoFixo['total'] ?? 0;
        $totalGastosVendas = $gastosVendas['total'] ?? 0;

        if (!$totalFaturamento || !$totalApuracao || !$totalCustosFixos || !$totalGastosVendas) {
            throw new \Exception('Valores inválidos fornecidos para cálculo de indicadores.');
        }

        // Resultado para cada período (1º mês + anos subsequentes)
        $indicadores = [];

        for ($ano = 0; $ano <= $periodos; $ano++) {
            $receita = $totalFaturamento * pow($crescimento, $ano);
            $custosVariaveis = $totalApuracao * pow($crescimento, $ano);
            $custosFixos = $totalCustosFixos * pow($crescimento, $ano);
            $gastosVendas = $totalGastosVendas * pow($crescimento, $ano);

            $custosVariaveisTotais = $custosVariaveis + $gastosVendas;
            $margemContribuicao = $receita - $custosVariaveisTotais;
            $margemContribuicaoPercentual = $margemContribuicao / $totalFaturamento;
            $resultadoOperacional = $margemContribuicao - $custosFixos;
            $pontoEquilibrio = $margemContribuicaoPercentual > 0 ? $custosFixos / $margemContribuicaoPercentual : 0;

            $lucratividade = $receita > 0 ? ($resultadoOperacional / $receita) * 100 : 0;
            $rentabilidade = $custosFixos > 0 ? ($resultadoOperacional / $custosFixos) * 100 : 0;

            $indicadores[] = [
                'periodo' => $ano === 0 ? '1º mês' : "Ano $ano",
                'receita' => $receita,
                'custosVariaveis' => $custosVariaveis,
                'custosFixos' => $custosFixos,
                'gastosVendas' => $gastosVendas,
                'custosVariaveisTotais' => $custosVariaveisTotais,
                'margemContribuicao' => $margemContribuicao,
                'resultadoOperacional' => $resultadoOperacional,
                'pontoEquilibrio' => $pontoEquilibrio,
                'lucratividade' => round($lucratividade, 2),
                'rentabilidade' => round($rentabilidade, 2),
            ];
        }

        return $indicadores;
    }

}
