<?php

namespace App\Http\Controllers;

use App\Models\Cliente;
use App\Models\Concorrente;
use App\Models\Fornecedor;
use App\Models\Plano;
use Illuminate\Http\Request; 
use Inertia\Inertia; 

class MercadoController extends Controller
{
    public function create($id)
    {
        return Inertia::render('Mercado', [
            'planoId' => $id,
            'status' => session('status')
        ]);
    } 
 
    public function store(Request $request, $id) 
{
    //dd($request->all());
    // Validação dos dados
    $validated = $request->validate([
        'client.perfil' => 'required|string|max:255',
        'client.comportamento' => 'required|string|max:255',
        'client.área' => 'required|string|max:255',
        
        'concorrente.*.qualidade_concorrente' => 'required|string|max:255',
        'concorrente.*.nome_concorrente' => 'required|string|max:255',
        'concorrente.*.preco_concorrente' => 'required|numeric',
        'concorrente.*.pagamento_concorrente' => 'required|string|max:255',
        'concorrente.*.localizacao_concorrente' => 'required|string|max:255',
        'concorrente.*.garantias_concorrente' => 'nullable|string|max:255',
        'concorrente.*.servico_concorrente' => 'nullable|string|max:255',
        
        'fornecedor.*.descricao_fornecedor' => 'required|string|max:255',
        'fornecedor.*.nome_fornecedor' => 'required|string|max:255',
        'fornecedor.*.preco_fornecedor' => 'required|numeric',
        'fornecedor.*.pagamento_fornecedor' => 'required|string|max:255',
        'fornecedor.*.localizacao_fornecedor' => 'required|string|max:255',
        'fornecedor.*.prazo_entrega' => 'nullable|string|max:255',
    ]);
    
    $plano = Plano::findOrFail($id);
    
    // Criando a entrada de Cliente
    Cliente::create([
        'perfil' => $validated['client']['perfil'],
        'comportamento' => $validated['client']['comportamento'],
        'area' => $validated['client']['área'], 
        'id_plano' => $plano->id
    ]);

    // Iterando sobre os concorrentes e criando as entradas
    if (isset($validated['concorrente'])) {
        foreach ($validated['concorrente'] as $concorrenteData) {
            Concorrente::create([
                'qualidade' => $concorrenteData['qualidade_concorrente'],
                'nome' => $concorrenteData['nome_concorrente'],
                'preco' => $concorrenteData['preco_concorrente'],
                'pagamento' => $concorrenteData['pagamento_concorrente'],
                'localizacao' => $concorrenteData['localizacao_concorrente'],
                'garantias' => $concorrenteData['garantias_concorrente'] ?? null,
                'servico' => $concorrenteData['servico_concorrente'] ?? null,
                'id_plano' => $plano->id
            ]);
        }
    }

    // Iterando sobre os fornecedores e criando as entradas
    if (isset($validated['fornecedor'])) {
        foreach ($validated['fornecedor'] as $fornecedorData) {
            Fornecedor::create([
                'id_plano' => $plano->id,
                'descricao' => $fornecedorData['descricao_fornecedor'],
                'nome' => $fornecedorData['nome_fornecedor'],
                'preco' => $fornecedorData['preco_fornecedor'],
                'pagamento' => $fornecedorData['pagamento_fornecedor'],
                'localizacao' => $fornecedorData['localizacao_fornecedor'],
                'prazo_entrega' => $fornecedorData['prazo_entrega'] ?? null,
            ]);            
        }
    }

    // Redirecionando com a mensagem de sucesso
    return redirect()->route('plano_marketing', [$id])->with('success', 'Dados de mercado salvos com sucesso!');
}

    
}
