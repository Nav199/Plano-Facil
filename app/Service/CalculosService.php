<?php

namespace App\Service;
use Illuminate\Support\Facades\Log;
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
    
    public function calcularIndicadores($faturamento, $apuracao, $custoFixo, $gastosVendas)
{
    // Validação para evitar divisão por zero
    if ($faturamento <= 0) {
        throw new \InvalidArgumentException('O faturamento deve ser maior que zero.');
    }

    // Verificar se os valores são números válidos
    if (!is_numeric($faturamento) || !is_numeric($apuracao) || !is_numeric($gastosVendas) || !is_numeric($custoFixo)) {
        throw new \InvalidArgumentException('Erro nas variáveis. Todos os valores devem ser números.');
    }

    // Calcular a Margem de Contribuição
    $MC = $faturamento - ($apuracao + $gastosVendas);

    // Calcular a Lucratividade e a Rentabilidade
    $lucratividade = round(($MC / $faturamento) * 100, 2);
    $rentabilidade = round(($MC - $custoFixo) / $faturamento * 100, 2);

    // Retornar os resultados
    return [
        'lucratividade' => $lucratividade,
        'rentabilidade' => $rentabilidade,
    ];
}


    //Calculo do Capital de Giro

}
