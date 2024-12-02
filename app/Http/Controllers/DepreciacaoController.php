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
        return Inertia::render('Depre', [
            'planoId' => $id,
            'total' => $total,
            'status' => session('status')
        ]);
    }

    public function store(Request $request, $id)
    {
        // Validação dos dados
        $validated = $request->validate([
            'ativos' => 'required|array',
            'ativos.*.nome' => 'required|string|max:255',
            'ativos.*.valor' => 'required|numeric|min:0',
            'ativos.*.vidaUtil' => 'required|integer|min:1',
            'ativos.*.depAnual' => 'required|numeric|min:0',
            'ativos.*.depMensal' => 'required|numeric|min:0',
        ]);
    
        // Salvar os dados validados no banco de dados
        foreach ($validated['ativos'] as $ativo) {
            $totalDepreciacao = $ativo['valor'] * $ativo['vidaUtil'];
    
            Depreciacao::create([
                'id_plano' => $id,  // Certifique-se de que o tipo de id_plano seja numérico
                'ativos' => $ativo['nome'],
                'valor' => $ativo['valor'],
                'anos' => $ativo['vidaUtil'],
                'anual' => $ativo['depAnual'],
                'mensal' => $ativo['depMensal'],
                'total' => $totalDepreciacao,
            ]);
        }
    
        return redirect()->route('custo-fixo', [$id])
            ->with('success', 'Depreciações salvas com sucesso.');
    } 

    public function getTotais($id)
    {
        $totais = [
            'imoveis' => DB::table('imoveis')->where('id_plano', $id)->sum('total'),
            'maquinas' => DB::table('maquina')->where('id_plano', $id)->sum('total'),
            'equipamentos' => DB::table('equipamento')->where('id_plano', $id)->sum('total'),
            'moveis_utensilios' => DB::table('moveis_utensilios')->where('id_plano', $id)->sum('total'),
            'veiculos' => DB::table('veiculo')->where('id_plano', $id)->sum('total'),
            'computadores' => DB::table('computador')->where('id_plano', $id)->sum('total'),
        ];

        return $totais;
    }
}