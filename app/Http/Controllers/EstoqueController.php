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
    //Controller de estoque

    protected $calculosService;

    public function __construct(CalculosService $calculosService)
    {
        $this->calculosService = $calculosService;
    }

  public function create($id): Response
  { 
    return Inertia::render('Estoque',[
        "planoId"=>$id,
        "status"=> session('status')
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
       $validatedData = $request->validate([
           'items' => 'required|array',
           'items.*.descricao' => 'required|string|max:255',
           'items.*.quantidade' => 'required|numeric|min:1',
           'items.*.valorUnitario' => 'required|numeric|min:0',
       ]);

       $plano = Plano::find($id);

       $itens = $validatedData['items'];

       // Calcular os totais usando o serviço
       $itensCalculados = $this->calculosService->calcular_estoque($itens);
       
       // Salvar os itens do estoque
       foreach ($itensCalculados as $item) {
          
        Estoque::create([
               'descricao' => $item['descricao'],
               'quantidade' => $item['quantidade'],
               'valor_unitario' => $item['valorUnitario'],
               'total' => $item['total'],
               'id_plano'=>$plano->id
           ]);
       }

       return redirect()->route('investimentoP', [$plano->id]); 
   }

}
