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
}
