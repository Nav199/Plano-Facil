<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ComercializacaoController extends Controller
{
    //Controller de Comercialização

    public function store(Request $request,$id)
    {
        return redirect()->route('apuracao', [$id])
        ->with('success', 'Estoque salvo com sucesso.');
    }
}
