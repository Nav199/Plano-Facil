<?php

namespace App\Http\Controllers;

use App\Models\InvestimentoPre;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;  

class InvestimentoPController extends Controller
{
    //Controller do investimento pré-operacional

    public function create($id)
    {
        return Inertia::render('Inves_pre',[
            'planoId'=>$id,
            'status'=>session('status')
        ]);
    }

    public function store(Request $request, $id)
    {
        $validatedData = $request->validate([
            'items' => 'required|array|min:1',
            'items.*.descricao' => 'required|string|max:200',
            'items.*.valor' => 'required|numeric|min:0',
        ]);
    
        foreach ($validatedData['items'] as $item) {
            InvestimentoPre::create([
                'id_plano' => $id,
                'descricao' => $item['descricao'],
                'valor' => $item['valor'],
            ]);
        }
    
        return redirect()->route('investimento-total')->with('status', 'Investimentos salvos com sucesso.');
    }
    
}
