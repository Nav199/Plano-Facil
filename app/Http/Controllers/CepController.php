<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Service\CepService;

class CepController extends Controller
{
    public function buscar(string $cep, CepService $service)
    {
        $endereco = $service->buscar($cep);

        if (!$endereco) {
            return response()->json(['error' => 'CEP não encontrado'], 404);
        }

        return response()->json($endereco);
    }

}