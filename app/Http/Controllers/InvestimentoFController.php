<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\InvestimentoFixo;
use App\Models\Plano;
use App\Service\CalculosService;
use Inertia\Inertia;

class InvestimentoFController extends Controller
{
    protected $calculosService;

    public function __construct(CalculosService $calculosService)
    {
        $this->calculosService = $calculosService;
    }

    public function create($id)
    {
        return Inertia::render('Financeiro', [
            'planoId' => $id,
            'status' => session('status')
        ]);
    }

    public function store(Request $request,$id)
{
    // Validação
    $validatedData = $request->validate([
        'imoveis' => 'required|array',
        'maquinas' => 'required|array',
        'equipamentos' => 'required|array',
        'veiculos' => 'required|array',
        'moveis_utensilios' => 'required|array',
        'computadores' => 'required|array',
    ]);

    // Calcular os subtotais e o total geral
    $subtotalImoveis = $this->calculosService->calcularSubtotal($validatedData['imoveis']);
    $subtotalMaquinas = $this->calculosService->calcularSubtotal($validatedData['maquinas']);
    $subtotalEquipamentos = $this->calculosService->calcularSubtotal($validatedData['equipamentos']);
    $subtotalVeiculos = $this->calculosService->calcularSubtotal($validatedData['veiculos']);
    $subtotalMoveisUtensilios = $this->calculosService->calcularSubtotal($validatedData['moveis_utensilios']);
    $subtotalComputadores = $this->calculosService->calcularSubtotal($validatedData['computadores']);

    $totalGeral = $this->calculosService->calcularTotal(
        $validatedData['imoveis'],
        $validatedData['maquinas'],
        $validatedData['equipamentos'],
        $validatedData['veiculos'],
        $validatedData['moveis_utensilios'],
        $validatedData['computadores']
    );

    $plano = Plano::findOrFail($id);

    // Salvar os dados no banco de dados
    $investimentoFixo = new InvestimentoFixo();
    $investimentoFixo->imoveis = json_encode($validatedData['imoveis']);
    $investimentoFixo->maquinas = json_encode($validatedData['maquinas']);
    $investimentoFixo->equipamentos = json_encode($validatedData['equipamentos']);
    $investimentoFixo->veiculos = json_encode($validatedData['veiculos']);
    $investimentoFixo->moveis_utensilios = json_encode($validatedData['moveis_utensilios']);
    $investimentoFixo->computadores = json_encode($validatedData['computadores']);
    $investimentoFixo->subtotal_imoveis = $subtotalImoveis;
    $investimentoFixo->subtotal_maquinas = $subtotalMaquinas;
    $investimentoFixo->subtotal_equipamentos = $subtotalEquipamentos;
    $investimentoFixo->subtotal_veiculos = $subtotalVeiculos;
    $investimentoFixo->subtotal_moveis_utensilios = $subtotalMoveisUtensilios;
    $investimentoFixo->subtotal_computadores = $subtotalComputadores;
    $investimentoFixo->total_geral = $totalGeral;
    $investimentoFixo->id_plano = $plano->id;
    $investimentoFixo->save();

    // Responder com sucesso
    return response()->json([
        'message' => 'Investimento fixo salvo com sucesso!',
        'investimentoFixo' => $investimentoFixo
    ], 201);
}

}
