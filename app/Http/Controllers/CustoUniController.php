<?php

namespace App\Http\Controllers;

use App\Models\Custo_Unitario;
use App\Models\Plano;
use App\Models\Marketing;
use App\Service\CalculosService;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Inertia\Inertia;
 
class CustoUniController extends Controller
{
    protected $calculosService;

    public function __construct(CalculosService $calculosService)
    {
        $this->calculosService = $calculosService;
    }

    public function create($id)
    {
        $produtos = $this->listar_produtos($id);
        return Inertia::render('Uni_Cus', [
            'planoId'=>$id,
            'status' => session('status'),
            'produtos' => $produtos
        ]);
    }

    public function calcularCustos(Request $request)
    {
        // Recebe os itens do front-end
        $itens = $request->input('itens');

        // Calcula os totais de cada item
        $itensAtualizados = $this->calculosService->calcular_estoque($itens);

        // Retorna os itens atualizados ao front-end
        return response()->json([
            'itens' => $itensAtualizados,
        ]);
    }

    public function listar_produtos($id)
    {
        return Marketing::where('id_plano', $id)
            ->select('id', 'produto', 'preco', 'estrategia_promo', 'estrategia_comer', 'localizacao', 'id_plano', 'created_at', 'updated_at')
            ->get();
    }

    public function store(Request $request, $id)
    {
        //dd($request->all());
        
        $request->validate([
            'produtos' => 'required|array',
            'produtos.*.name' => 'required|string|max:255',
            'produtos.*.itens' => 'required|array', 
            'produtos.*.itens.*.material' => 'required|string|max:255',
            'produtos.*.itens.*.quantidade' => 'required|numeric|min:0',
            'produtos.*.itens.*.valorUnitario' => 'required|numeric|min:0',
            'produtos.*.totalGeral' => 'required|numeric|min:0',
        ]);
    
        $plano = Plano::findOrFail($id);
    
     
        foreach ($request->produtos as $produto) {
            foreach ($produto['itens'] as $item) {
                Custo_Unitario::create([ 
                    'id_plano' => $plano->id,
                    'produto' => $produto['name'],
                    'material' => $item['material'],
                    'quantidade' => $item['quantidade'],
                    'valor_unitario' => $item['valorUnitario'],
                    'total' => $item['total'],
                    'total_geral' => $produto['totalGeral'], 
                ]);
            }
        }
    
        // Redireciona de volta com uma mensagem de sucesso
        return redirect()->route('comercializacao', ['id' => $plano->id])->with('status', 'Custos armazenados com sucesso!');

    }
    

}
