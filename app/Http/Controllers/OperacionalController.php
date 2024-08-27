<?php

namespace App\Http\Controllers;

use App\Models\Operacional;
use App\Models\Plano;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OperacionalController extends Controller
{
    public function create($id)
    {

        return Inertia::render('Operacional', [
            'planoId' => $id,
            'status' => session('status')
        ]);
    }

    public function store(Request $request, $id)
{
    // Depuração
    // dd($request->all());

    $plano = Plano::all();
    $plano_ = $plano->filter(function ($item) use ($id) {
        return $item->id == $id;
    })->first(); 

    // Validação dos campos
    $request->validate([
        'capacidadeProdutiva' => 'required',
        'volumeProducao' => 'required',
        'pessoal.*.cargo' => 'required',
        'pessoal.*.qualificacao' => 'required',
    ]);

    // Criar o registro Operacional
    foreach ($request->input('pessoal') as $pessoal) {
        Operacional::create([
            'capacidade' => $request->input('capacidadeProdutiva'),
            'volume' => $request->input('volumeProducao'),
            'cargo' => $pessoal['cargo'],
            'qualificacao' => $pessoal['qualificacao'],
            'id_plano' => $plano_->id 
        ]);
    }

    return redirect()->route('operacional.index')->with('status', 'Operacional criado com sucesso!');
}

}
