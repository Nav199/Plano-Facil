<?php

namespace App\Http\Controllers;

use App\Models\Faturamento;
use App\Service\CalculosService;
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

    public function store(Request $request,$id)
    {
        //dd($request->all());
        $validated = $request->validate([
            'items' => 'required|array',
            'items.*.descricao' => 'required|string',
            'items.*.quantidade' => 'required|integer|min:0',
            'items.*.valor' => 'required|numeric|min:0',
            'crescimento' => 'required|numeric|min:0'
        ]);
        
        foreach ($validated['items'] as $item) {
            Faturamento::create([
                'id_plano' => $id,
                'produto' => $item['descricao'],
                'quantidade' => $item['quantidade'],
                'valor_unitario' => $item['valor'],
                'total' => $item['quantidade'] * $item['valor'],
                'crescimento'=> $validated['crescimento']
            ]);
        }
    

        return redirect()->route('custo', [$id])
        ->with('success', 'Estoque salvo com sucesso.');
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
