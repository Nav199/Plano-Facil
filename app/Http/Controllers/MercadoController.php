<?php

namespace App\Http\Controllers;

use App\Models\Cliente;
use App\Models\Concorrente;
use App\Models\Fornecedor;
use Illuminate\Auth\Events\Validated;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class MercadoController extends Controller
{
    public function create():Response
    {
        return Inertia::render('Mercado',[
            'status'=>session('status')
        ]);
    }

    public function store(Request $request)
    { 
        //validação de dados
       dd( $request->all());
       $validated = $request->validate([
        'perfil'=> 'required|string|max:40',
        'comportamento'=>'required|string|max:60',
        'area'=>'required|string|max:40',
        'qualidade_concorrente'=>'required|string|max:40',
        'nome_concorrente'=>'required|string|max:40',
        'preco_concorrente'=>'required|float',
        'garantias_concorrente'=>'required|string|max:40',
        'pagamento_concorrente'=>'required|string|max:40',
        'servico_concorrente'=>'required|string|max:40',
        'localizacao_concorrente'=>'required|string|max:40',
        'descricao_fornecedor'=>'required|string|max:40',
        'nome_fornecedor'=>'required|string|max:40',
        'preco_fornecedor'=>'required|string|max:40',
        'pagamento_fornecedor'=>'required|string|max:40',
        'localizacao_fornecedor'=>'required|string|max:40', 
        'id_mercado' => 'required|exists:mercados,id',
       ]);

       //criação do Cliente
       Cliente::create([
        'perfil'=>$validated['perfil'],
        'comportamento'=>$validated['comportamento'],
        'area'=>$validated['area'],
        'id_mercado' => $validated['id_mercado'],
       ]);
        // Criação do Concorrente
    Concorrente::create([
        'id_mercado' => $validated['id_mercado'],
        'qualidade' => $validated['qualidade_concorrente'],
        'nome' => $validated['nome_concorrente'],
        'preco' => $validated['preco_concorrente'],
        'garantias' => $validated['garantias_concorrente'],
        'pagamento' => $validated['pagamento_concorrente'],
        'servico' => $validated['servico_concorrente'],
        'localizacao' => $validated['localizacao_concorrente'],
    ]);

    // Criação do Fornecedor
    Fornecedor::create([
        'id_mercado' => $validated['id_mercado'],
        'descricao' => $validated['descricao_fornecedor'],
        'nome' => $validated['nome_fornecedor'],
        'preco' => $validated['preco_fornecedor'],
        'pagamento' => $validated['pagamento_fornecedor'],
        'localizacao' => $validated['localizacao_fornecedor'],
    ]);
    }
}
