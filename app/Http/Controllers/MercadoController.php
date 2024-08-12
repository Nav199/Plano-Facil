<?php

namespace App\Http\Controllers;

use App\Models\Cliente;
use App\Models\Concorrente;
use App\Models\Fornecedor;
use App\Models\Mercado;
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

    public function store(Request $request,$id)
    { 
        //validação de dados
       dd( $request->all());

       // Validação dos dados
       $validated = $request->validate([
        'client.perfil' => 'required|string|max:255',
        'client.comportamento' => 'required|string|max:255',
        'client.area' => 'required|string|max:255',

        'concorrente.qualidade' => 'required|string|max:255',
        'concorrente.nome' => 'required|string|max:255',
        'concorrente.preco' => 'required|numeric',
        'concorrente.pagamento' => 'required|string|max:255',
        'concorrente.localizacao' => 'required|string|max:255',
        'concorrente.garantias' => 'nullable|string|max:255',
        'concorrente.servico' => 'nullable|string|max:255',

        'fornecedor.descricao' => 'required|string|max:255',
        'fornecedor.nome' => 'required|string|max:255',
        'fornecedor.preco' => 'required|numeric',
        'fornecedor.pagamento' => 'required|string|max:255',
        'fornecedor.localizacao' => 'required|string|max:255',
        'id_plano' => $id,
    ]);


    // Criando as entradas associadas
    Cliente::create([
        'perfil' => $validated['client']['perfil'],
        'comportamento' => $validated['client']['comportamento'],
        'area' => $validated['client']['area'],
    ]);

    Concorrente::create([
        'qualidade' => $validated['concorrente']['qualidade'],
        'nome' => $validated['concorrente']['nome'],
        'preco' => $validated['concorrente']['preco'],
        'pagamento' => $validated['concorrente']['pagamento'],
        'localizacao' => $validated['concorrente']['localizacao'],
        'garantias' => $validated['concorrente']['garantias'],
        'servico' => $validated['concorrente']['servico'],
    ]);

    Fornecedor::create([
        'descricao' => $validated['fornecedor']['descricao'],
        'nome' => $validated['fornecedor']['nome'],
        'preco' => $validated['fornecedor']['preco'],
        'pagamento' => $validated['fornecedor']['pagamento'],
        'localizacao' => $validated['fornecedor']['localizacao'],
    ]);

    return redirect()->back()->with('success', 'Plano de mercado salvo com sucesso!');
}
}
