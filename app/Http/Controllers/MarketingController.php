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
        dd(request()->all());
        $validated = $request->validate([
            'produtos.*.name' => 'required|string|min:60',
            'produtos.*.price' => 'required|numeric|min:40',
            'estrategia_promo' => 'required|string|min:60',
            'estrategia_comer' => 'required|string|min:60',
            'localizacao' => 'required|string|min:40'
        ]);
        dd($validated);
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
