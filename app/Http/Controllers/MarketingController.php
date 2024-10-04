<?php
namespace App\Http\Controllers;

use App\Models\Marketing;
use App\Models\Plano;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class MarketingController extends Controller
{
    public function create($id): Response
    {
        return Inertia::render('Marketing', [
            'planoId'=>$id,
            'status' => session('status')
        ]); 
    }

    public function store(Request $request,$id)
    {
       
        $validated = $request->validate([
            'produtos.*.name' => 'required|string|min:1',
            'produtos.*.price' => 'required|numeric|min:0',
            'estrategia_promo' => 'required|string|min:1',
            'estrategia_comer' => 'required|string|min:1',
            'localizacao' => 'required|string|min:1'
        ]);
        $plano = Plano::findOrFail($id);
        Marketing::create([
            'produto' => implode(',', array_column($validated['produtos'], 'name')),
            'preco' => implode(',', array_column($validated['produtos'], 'price')),
            'estrategia_promo' => $validated['estrategia_promo'],
            'estrategia_comer' => $validated['estrategia_comer'],
            'localizacao' => $validated['localizacao'],
            'id_plano' => $plano->id
        ]);
        

        return redirect()->route('plano_operacional', [$id])->with('status', 'Marketing cadastrado com sucesso!');
    }


   
}
