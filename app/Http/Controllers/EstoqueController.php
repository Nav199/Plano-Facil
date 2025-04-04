<?php

namespace App\Http\Controllers;

use App\Models\Estoque;
use App\Models\Plano;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response; 
use App\Service\CalculosService;

class EstoqueController extends Controller
{
    // Controller de estoque

    protected $calculosService;

    public function __construct(CalculosService $calculosService)
    {
        $this->calculosService = $calculosService;
    }

    public function create($id): Response
    { 
        return Inertia::render('Estoque', [
            "planoId" => $id,
            "status" => session('status')
        ]);
    }

    public function calculo(Request $request)
    {
        $itens = $request->input('items');

        // Calcular o total de cada item
        $itensCalculados = $this->calculosService->calcular_estoque($itens);

        // Calcular o total geral
        $totalGeral = $this->calculosService->total_estoque($itensCalculados);

        // Retornar os itens calculados e o total geral para o front-end
        return response()->json([
            'itens' => $itensCalculados,
            'totalGeral' => $totalGeral
        ]);
    }

    // Método para armazenar os dados do estoque
    public function store(Request $request, $id)
    {
        // Validação dos dados recebidos
        $validatedData = $request->validate([
            'items' => 'required|array',
            'items.*.descricao' => 'required|string|max:255',
            'items.*.quantidade' => 'required|numeric|min:1',
            'items.*.valorUnitario' => 'required|string|max:255',
        ]);

        // Encontre o plano relacionado ao id
        $plano = Plano::find($id);
        
        // Se o plano não for encontrado, retornar um erro
        if (!$plano) {
            return redirect()->route('home')->with('error', 'Plano não encontrado!');
        }

        $itens = $validatedData['items'];

        // Salvar os itens do estoque
        foreach ($itens as $item) {
            // Limpeza e conversão dos valores de entrada (valorUnitario e total)
            $valorUnitario = floatval(str_replace(['R$', '.', ','], ['', '', '.'], $item['valorUnitario']));
            $total = $item['quantidade'] * $valorUnitario;

            // Salvar o item no banco de dados
            Estoque::create([
                'descricao' => $item['descricao'],
                'quantidade' => $item['quantidade'],
                'valor_unitario' => $valorUnitario,
                'total' => $total,
                'id_plano' => $plano->id
            ]);
        }

        // Redirecionar de volta para a página de investimentos ou plano
        return redirect()->route('investimentoP', [$plano->id])->with('status', 'Estoque salvo com sucesso!');
    }
}
