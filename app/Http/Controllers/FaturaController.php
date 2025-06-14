<?php

namespace App\Http\Controllers;

use App\Models\Faturamento;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\DB;

class FaturaController extends Controller
{
    public function create($id)
    {
        $produtos = $this->listar_produtos($id);
        return Inertia::render('Fatura', [
            'planoId' => $id,
            'status' => session('status'),
            'produtos' => $produtos
        ]);
    }

    public function store(Request $request, $id)
    {
        $validated = $request->validate([
            'items' => 'required|array',
            'items.*.descricao' => 'required|string',
            'items.*.quantidade' => 'required|integer|min:0',
            'items.*.valor' => 'required|string|min:1', 
            'crescimento' => 'required|numeric|min:0'
        ]);

        foreach ($validated['items'] as $item) {
            $valor = $this->removerFormatoMoeda($item['valor']); 

            Faturamento::create([
                'id_plano' => $id,
                'produto' => $item['descricao'],
                'quantidade' => $item['quantidade'],
                'valor_unitario' => $valor,
                'total' => $item['quantidade'] * $valor,
                'crescimento' => $validated['crescimento']
            ]);
        }

        return redirect()->route('custo', [$id])
            ->with('success', 'Estoque salvo com sucesso.');
    }

    private function removerFormatoMoeda($valor)
    {
        $valorLimpo = preg_replace('/\D/', '', $valor);  // Remove tudo que não for número

        // Dividir o valor limpo em centavos e transformar para float
        return floatval($valorLimpo) / 100;
    }

    private function listar_produtos($id)
    {
        return DB::table('marketing')
            ->join('plano_negocios', 'marketing.id_plano', '=', 'plano_negocios.id')
            ->select('marketing.id', 'marketing.produto', 'marketing.preco')
            ->where('marketing.id_plano', $id)
            ->get();
    }
}
