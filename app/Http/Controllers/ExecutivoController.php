<?php

namespace App\Http\Controllers;

use App\Models\Enquadramento;
use App\Models\Executivo;
use App\Models\Forma;
use App\Models\Plano;
use App\Service\CnaeService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ExecutivoController extends Controller
{
    //

    public function create():Response
    {
        return Inertia::render('Executivo', [
            'status' => session('status'),
        ]);

    }

    public function store(Request $request)
    {
        // Validação dos dados
        $validated = $request->validate([
            'nome' => 'required|string|max:125',
            'cpfCnpj' => 'required|string|max:20',
            'missao' => 'nullable|string|max:1000',
            'setorAtividade' => 'required|string|max:120',
            'formaJuridica' => 'required|string|max:120',
            'enquadramentoTributario' => 'nullable|string|max:120',
            'visao' => 'nullable|string|max:100',
            'valores' => 'nullable|string|max:100',
            'fonteRecursos' => 'nullable|string|max:1000',
        ]);
    
        // Buscando a descrição do CNAE com base no setor de atividade
        $cnaeData = app(\App\Service\CnaeService::class)->getCnaeData();
        $cnaeDescription = null;
    
        foreach ($cnaeData as $cnae) {
            if ($cnae['CNAE'] == $validated['setorAtividade']) {
                $cnaeDescription = $cnae['Descrição'];
                break;
            }
        }
    
        if ($cnaeDescription === null) {
            return redirect()->back()->withErrors(['setorAtividade' => 'Setor de atividade inválido.']);
        }
    
        // Criação do Plano
        $plano = Plano::create([
            'id_user' => auth()->id(),
            'nome' => $validated['nome'],
        ]);
    
        // Criação do Executivo
        Executivo::create([
            'nome_empresa' => $validated['nome'],
            'cpf_cnpj' => $validated['cpfCnpj'],
            'missao' => $validated['missao'],
            'setor_atividade' => $cnaeDescription, // Salvando a descrição do CNAE
            'visao' => $validated['visao'],
            'valores' => $validated['valores'], 
            'fonte_recursos' => $validated['fonteRecursos'],
            'id_plano' => $plano->id,
        ]);
        $forma = Forma::create([
            'tipo' => $validated['formaJuridica'],
        ]);
        Enquadramento::create([
            'id_forma'=>$forma->id,
            'tipo' => $validated['enquadramentoTributario'],
        ]);

        // Redirecionamento após sucesso
        return redirect()->route('plano_mercado', [$plano->id])->with('success', 'Executivo criado com sucesso.');
    }
    
}
