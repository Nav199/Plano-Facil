<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class SociosController extends Controller
{
    public function create()
    {
        return Inertia::render('Empreendedor', [
            "status" => session('status')
        ]);
    }

    public function store()
    {
        return redirect()->route('plano_executivo')->with('success', 'Executivo criado com sucesso.');
    }
}
