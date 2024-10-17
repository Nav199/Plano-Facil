<?php

namespace App\Http\Controllers;

use App\Models\CustoFixo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class CustoFixoController extends Controller
{
    //Controller do Custo Fixo
 
    public function create($id)
    {
        $salario = $this->listar_salario($id);

        $depreciacao = $this->listar_depre($id);

        return Inertia::render('CustosFixos',[
            'Salario'=> $salario,
            'Depreciacao'=>$depreciacao,
            'planoId' => $id,
            "status"=> session('status')
        ]);
    }

    public function store(Request $request, $id)
    {
       //dd($request->all());
        // Validação dos dados
        $validated = $request->validate([
            'custos' => 'required|array',
            'custos.*.descricao' => 'required|string',
            'custos.*.valor' => 'nullable|numeric',  // Permitir valores nulos
            'crescimento' => 'nullable|numeric',  // Permitir valores nulos
            'total' => 'nullable|numeric' // Permitir valores nulos
        ]);
    
        foreach ($validated['custos'] as &$custo) {
            // Verifica se os valores são nulos e atribui 0 ou outro valor padrão
            $custo['valor'] = $custo['valor'] ?? 0;
            $custo['crescimento'] = $validated['crescimento'] ?? 0; // Caso venha nulo, atribuir 0
            $custo['total'] = $validated['total'] ?? 0; // Caso venha nulo, atribuir 0
        }
    
        foreach ($validated['custos'] as $item) {
            CustoFixo::create([
                'id_plano' => $id,
                'descricao' => $item['descricao'],
                'custo' => $item['valor'],
                'crescimento' => $item['crescimento'],
                'total' => $item['total']
            ]);
        }
    // Redireciona para a página de custos fixos
    return redirect()->route('custos-fixos', ['id' => $id])->with('status', 'Custos fixos salvos com sucesso!');
}





    public function listar_salario($id)
    {
        // Realiza o join entre a tabela 'mao_obra' e a tabela 'planos' (substitua 'planos' pelo nome real da tabela de planos)
        $salarios = DB::table('mao_obra')
            ->join('plano_negocios', 'mao_obra.id_plano', '=', 'plano_negocios.id')
            ->where('mao_obra.id_plano', $id)
            ->select('mao_obra.total') // Seleciona apenas a coluna 'total'
            ->get(); // Retorna os resultados
    
        // Para retornar apenas o total acumulado:
        $totalSalarios = $salarios->sum('total'); // Soma os totais retornados
    
        return $totalSalarios; // Retorna o total acumulado
    }
    
    
    
    public function listar_depre($id)
    {
        $depreciacoes = DB::table('depreciacao')
        ->where('id_plano', $id)
        ->sum('total'); // Soma o valor da depreciação
        return $depreciacoes;
    }
}
