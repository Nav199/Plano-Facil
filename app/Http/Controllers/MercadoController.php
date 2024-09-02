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
       
    
        // Validação dos dados
        $validated = $request->validate([
            'client.perfil' => 'required|string|max:255',
            'client.comportamento' => 'required|string|max:255',
            
            'client.área' => 'required|string|max:255',
            
        
            'concorrente.qualidade_concorrente' => 'required|string|max:255',
            'concorrente.nome_concorrente' => 'required|string|max:255',
            'concorrente.preco_concorrente' => 'required|numeric',
            'concorrente.pagamento_concorrente' => 'required|string|max:255',
            'concorrente.localizacao_concorrente' => 'required|string|max:255',
            'concorrente.garantias_concorrente' => 'nullable|string|max:255',
            'concorrente.servico_concorrente' => 'nullable|string|max:255',
            
            // Alterado para corresponder ao nome correto enviado
            'fornecedor.descricao_fornecedor' => 'required|string|max:255',
            'fornecedor.nome_fornecedor' => 'required|string|max:255',
            'fornecedor.preco_fornecedor' => 'required|numeric',
            'fornecedor.pagamento_fornecedor' => 'required|string|max:255',
            'fornecedor.localizacao_fornecedor' => 'required|string|max:255',
        ]);
        
        $plano = Plano::findOrFail($id);
    
        // Criando as entradas associadas
        Cliente::create([
            'perfil' => $validated['client']['perfil'],
            'comportamento' => $validated['client']['comportamento'],
            'area' => $validated['client']['área'], 
            'id_plano' => $plano->id
        ]);
    
        Concorrente::create([
            'qualidade' => $validated['concorrente']['qualidade_concorrente'], 
            'nome' => $validated['concorrente']['nome_concorrente'], 
            'preco' => $validated['concorrente']['preco_concorrente'], 
            'pagamento' => $validated['concorrente']['pagamento_concorrente'], 
            'localizacao' => $validated['concorrente']['localizacao_concorrente'], 
            'garantias' => $validated['concorrente']['garantias_concorrente'] ?? null, 
            'servico' => $validated['concorrente']['servico_concorrente'] ?? null, 
            'id_plano' => $plano->id
        ]);
    
        Fornecedor::create([
            'descricao' => $validated['fornecedor']['descricao_fornecedor'], 
            'nome' => $validated['fornecedor']['nome_fornecedor'], 
            'preco' => $validated['fornecedor']['preco_fornecedor'], 
            'pagamento' => $validated['fornecedor']['pagamento_fornecedor'], 
            'localizacao' => $validated['fornecedor']['localizacao_fornecedor'], 
            'id_plano' => $plano->id
        ]);
    
        return redirect()->route('plano_marketing', [$id])->with('success', 'Dados de mercado salvos com sucesso!');
    }
    
}
