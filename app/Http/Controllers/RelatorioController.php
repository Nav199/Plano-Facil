<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Plano;

class RelatorioController extends Controller
{
    public function create($id)
    {
        // Carregar os dados do plano com os relacionamentos necessários
        $plano = Plano::with([
            'executivos',
            'veiculo',
            'maquina',
            'imoveis',
            'equipamento',
            'Forma',
            'investimento_pre',
            'Faturamento',
        ])->find($id);

        // Verificar se existe um plano e se há dados nos relacionamentos
        $hasData = $plano && (
            $plano->executivos->isNotEmpty() ||
            $plano->veiculo->isNotEmpty() ||
            $plano->maquina->isNotEmpty() ||
            $plano->imoveis->isNotEmpty() ||
            $plano->equipamento->isNotEmpty() ||
            $plano->Forma->isNotEmpty() ||
            $plano->investimento_pre->isNotEmpty() ||
            $plano->Faturamento->isNotEmpty()
        );

        // Definir mensagem de erro caso não existam dados
        $message = $hasData
            ? null
            : 'Não há dados disponíveis para exibir neste plano.';

        // Renderizar o componente com os dados
        return Inertia::render('Relatorio/Relatorio', [
            'status' => session('status'),
            'plano' => $plano,
            'message' => $message,
        ]);
    }
}
