<?php

namespace App\Http\Controllers;

use App\Models\investimento_total;
use App\Models\Plano;
use Inertia\Inertia;
use Illuminate\Http\Request;

class InvestimentoTController extends Controller
{ 
    public function create($id)
    {
        return Inertia::render('Inves_total', [
            'planoId' => $id,
            'status' => session('status'),
            'investimento' => $this->show($id),
        ]);
    }

    public function store(Request $request,$id)
    {

        //dd($request->all());
        $validate = $request->validate([
            'total'=>'required|numeric'
        ]);

        investimento_total::create([
            'id_plano'=>$id,
            'total_investimento'=>$validate['total']
        ]);

        return redirect()->route('avaliacao', [$id])
        ->with('success', 'Estoque salvo com sucesso.');
    }

    private function show($id)
    {
        $plano = Plano::with([
            'veiculo',
            'maquina',
            'imoveis',
            'equipamento',
            'computador',
            'moveis',
            'capital_giro',
            'investimento_pre',
        ])->findOrFail($id);

        $veiculosTotal = $plano->veiculo->sum('total');
        $maquinasTotal = $plano->maquina->sum('total');
        $imoveisTotal = $plano->imoveis->sum('total');
        $equipamentosTotal = $plano->equipamento->sum('total');
        $computadoresTotal = $plano->computador->sum('total');
        $moveisTotal = $plano->moveis->sum('total');
        $investimentoPreTotal = $plano->investimento_pre->sum('valor');
        $capitalGiroTotal = $plano->capital_giro->sum('capital_giro');

        $somaTotal = $veiculosTotal + $maquinasTotal + $imoveisTotal + 
                     $equipamentosTotal + $computadoresTotal + $moveisTotal;

        return [
            'soma_total' => $somaTotal,
            'investimento_pre' => $investimentoPreTotal,
            'capital_giro' => $capitalGiroTotal,
        ];
    }
}
