<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\Plano;
use App\Service\CalculosService;
use Inertia\Inertia;
use Inertia\Response;

class InvestimentoFController extends Controller
{
    protected $calculosService;

    public function __construct(CalculosService $calculosService)
    {
        $this->calculosService = $calculosService;
    }

    public function create($id): Response
    {
        return Inertia::render('Inves', [
            'planoId' => $id,
            'status' => session('status')
        ]);
    }

    public function store(Request $request, $id)
{
    try {
        // Validação
        $validatedData = $request->validate([
            'imoveis' => 'required|array',
            'maquinas' => 'required|array',
            'equipamentos' => 'required|array',
            'veiculos' => 'required|array',
            'moveisUtensilios' => 'required|array',
            'computadores' => 'required|array',
        ]);

        // Verifica se o plano existe
        $plano = Plano::find($id);
        if (!$plano) {
            return redirect()->back()->withErrors(['message' => 'Plano não encontrado'])->withInput();
        }

        // Função para salvar cada item em sua respectiva tabela
        $this->salvarItens($validatedData['imoveis'], 'imoveis', $plano->id);
        $this->salvarItens($validatedData['maquinas'], 'maquina', $plano->id); 
        $this->salvarItens($validatedData['equipamentos'], 'equipamento', $plano->id);
        $this->salvarItens($validatedData['veiculos'], 'veiculo', $plano->id);
        $this->salvarItens($validatedData['moveisUtensilios'], 'moveis', $plano->id);
        $this->salvarItens($validatedData['computadores'], 'computador', $plano->id);

        // Responder com sucesso
        return redirect()->route('estoque',[$id])->with('status', 'Operacional criado com sucesso!');
    } catch (\Illuminate\Validation\ValidationException $e) {
        // Captura erros de validação
        return redirect()->back()->withErrors($e->validator)->withInput()->with('status', 'Erro de validação: ' . implode(', ', $e->errors()));
    } catch (\Exception $e) {
        // Retornar um erro em caso de falha
        return redirect()->back()->withErrors(['message' => 'Erro ao salvar: ' . $e->getMessage()])->withInput();
    }
}

private function salvarItens($itens, $tipo, $planoId)
{
    foreach ($itens as $item) {
        \DB::table($tipo)->insert([
            'descricao' => $item['descricao'],
            'quantidade' => $item['quantidade'],
            'valor_unitario' => $item['valorUnitario'],
            'total' => $item['quantidade'] * $item['valorUnitario'],
            'id_plano' => $planoId,
        ]);
    }
}

}
