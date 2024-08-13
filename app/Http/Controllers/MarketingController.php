<?php
namespace App\Http\Controllers;

use App\Models\Marketing;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class MarketingController extends Controller
{
    public function create(): Response
    {
        return Inertia::render('Marketing', [
            'status' => session('status')
        ]);
    }

    public function store(Request $request)
    {
       
        $validated = $request->validate([
            'produtos.*.name' => 'required|string|min:1',
            'produtos.*.price' => 'required|numeric|min:0',
            'estrategia_promo' => 'required|string|min:1',
            'estrategia_comer' => 'required|string|min:1',
            'localizacao' => 'required|string|min:1'
        ]);
        
        Marketing::create([
            'produto' => implode(',', array_column($validated['produtos'], 'name')),
            'preco' => implode(',', array_column($validated['produtos'], 'price')),
            'estrategia_promo' => $validated['estrategia_promo'],
            'estrategia_comer' => $validated['estrategia_comer'],
            'localizacao' => $validated['localizacao'],
        ]);
        

        return redirect()->route('plano_marketing')->with('status', 'Marketing cadastrado com sucesso!');
    }
}
