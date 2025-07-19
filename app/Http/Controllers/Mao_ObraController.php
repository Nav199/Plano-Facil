<?php

namespace App\Http\Controllers;

use App\Models\Obra;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class Mao_ObraController extends Controller
{
    // Controller de Mão de Obra

    public function create($id)
    {
        // Chama o método que lista os cargos e envia como prop para o frontend
        $cargo = $this->listar_cargo($id); 
        return Inertia::render('Mao_obra', [
            'planoId' => $id,
            'status' => session('status'),
            'cargo' => $cargo, // Envia a variável 'cargo' como prop
        ]);
    }
    
    public function listar_cargo($id)
    {
    
        return DB::table('operacional')
            ->join('plano_negocios', 'operacional.id_plano', '=', 'plano_negocios.id')
            ->select('operacional.cargo', 'operacional.qualificacao', 'operacional.capacidade', 'operacional.volume') // Selecione as colunas desejadas
            ->where('operacional.id_plano', $id)
            ->get(); 
    }

   
    public function store(Request $request, $id)
{
    $validatedData = $request->validate([
        'cargos' => 'required|array',
        'cargos.*.funcao' => 'required|string',
        'cargos.*.num_empregados' => 'required|numeric|min:1',
        'cargos.*.salario_mensal' => 'required|numeric|min:0',
        'cargos.*.encargos_percentual' => 'required|numeric|min:0',
    ]);

    $totalGeral = 0;

    foreach ($validatedData['cargos'] as $cargo) {
        $subtotal = $cargo['num_empregados'] * $cargo['salario_mensal'];
        $encargos = ($cargo['encargos_percentual'] / 100) * $subtotal;
        $total = $subtotal + $encargos;

        $totalGeral += $total;

        Obra::create([
            'id_plano'     => $id,
            'funcao'       => $cargo['funcao'],
            'empregado'    => $cargo['num_empregados'],
            'salario'      => $cargo['salario_mensal'],
            'encargo'      => $encargos,
            'total'        => $total,
            'total_geral'  => 0, // preenchido depois
        ]);
    }

    // Atualiza o total_geral em todas as linhas do plano
    Obra::where('id_plano', $id)->update([
        'total_geral' => $totalGeral
    ]);

    return redirect()->route('depreciacao', [$id])
        ->with('success', 'Salvo com sucesso.');
}

}
