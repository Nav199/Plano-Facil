<?php

namespace App\Http\Controllers;

use App\Models\Custo_Unitario;
use App\Models\Plano;
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
        
    
        $produtos = DB::table('marketing')
            ->join('plano_negocios', 'marketing.id_plano', '=', 'plano_negocios.id')
            ->select('marketing.id', 'marketing.produto', 'marketing.preco', 
                     'marketing.estrategia_promo', 'marketing.estrategia_comer', 
                     'marketing.localizacao', 'marketing.id_plano', 
                     'marketing.created_at', 'marketing.updated_at')
            ->where('marketing.id_plano', $id) // Filtra pelos produtos do plano específico
            ->get();
    
        return $produtos; // Retorna a lista de produtos
    }
    
    public function store(Request $request, $id)
    {
        // Validação dos dados recebidos
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
    
        // Loop através dos produtos e itens para armazenar no banco de dados
        foreach ($request->produtos as $produto) {
            // Você pode armazenar dados do produto, se necessário
            foreach ($produto['itens'] as $item) {
                Custo_Unitario::create([
                    'id_plano' => $plano->id, // Associe o plano
                    'material' => $item['material'],
                    'quantidade' => $item['quantidade'],
                    'valor_unitario' => $item['valorUnitario'],
                    'total' => $item['total'],
                    'total_geral' => $produto['totalGeral'], 
                ]);
            }
        }
    
        // Redireciona de volta com uma mensagem de sucesso
        return redirect()->route('custo', ['id' => $plano->id])->with('status', 'Custos armazenados com sucesso!');

    }
    

}
