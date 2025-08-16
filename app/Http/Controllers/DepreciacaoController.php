<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Depreciacao;
use Illuminate\Support\Facades\DB;

class DepreciacaoController extends Controller
{
    public function create($id)
    {
        $total = $this->getTotais($id);

        $totalFormatado = array_map(function ($valor) {
            return 'R$ ' . number_format($valor, 2, ',', '.');
        }, $total);

        return Inertia::render('Depre', [
            'planoId' => $id,
            'total' => $totalFormatado,
            'status' => session('status')
        ]);
    }

    public function store(Request $request, $id)
    {
        $validated = $request->validate([
            'ativos' => 'required|array',
            'ativos.*.nome' => 'required|string|max:255',
            'ativos.*.valor' => 'required|numeric|min:0',
            'ativos.*.vidaUtil' => 'required|integer|min:1',
        ]);
    
        foreach ($validated['ativos'] as $ativo) {
            $depAnual = $ativo['valor'] / $ativo['vidaUtil'];
            $depMensal = $depAnual / 12;
    
            Depreciacao::create([
                'id_plano' => $id,
                'ativos' => $ativo['nome'],
                'valor' => $ativo['valor'],
                'anos' => $ativo['vidaUtil'],
                'anual' => $depAnual,
                'mensal' => $depMensal,
                'total' => $ativo['valor'],
            ]);
        }
    
        return redirect()->route('custo-fixo', [$id])
            ->with('success', 'Depreciações salvas com sucesso.');
    }
    

    public function getTotais($id)
    {
        return [
            'imoveis' => DB::table('imoveis')->where('id_plano', $id)->sum('total'),
            'maquinas' => DB::table('maquinas')->where('id_plano', $id)->sum('total'),
            'equipamentos' => DB::table('equipamentos')->where('id_plano', $id)->sum('total'),
            'moveis_utensilios' => DB::table('moveis_utensilios')->where('id_plano', $id)->sum('total'),
            'veiculos' => DB::table('veiculos')->where('id_plano', $id)->sum('total'),
            'computadores' => DB::table('computadores')->where('id_plano', $id)->sum('total'),
        ];
    }
}
