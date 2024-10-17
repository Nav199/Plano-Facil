<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;


class DepreciacaoController extends Controller
{
    //Controller de Depreciação
    public function create($id)
    {
        $total = $this->getTotais($id);
        return Inertia::render('Depre',[
            'planoId'=>$id,
            'total'=>$total,
            'status' => session('status')
        ]);
    }


    public function getTotais($id)
    {
        // Consulta para obter os totais de cada tabela, filtrando pelo id_plano
        $totais = [
            'imoveis' => DB::table('imoveis')->where('id_plano', $id)->sum('total'),
            'maquinas' => DB::table('maquina')->where('id_plano', $id)->sum('total'),
            'equipamentos' => DB::table('equipamento')->where('id_plano', $id)->sum('total'),
            'moveis_utensilios' => DB::table('moveis_utensilios')->where('id_plano', $id)->sum('total'),
            'veiculos' => DB::table('veiculo')->where('id_plano', $id)->sum('total'),
            'computadores' => DB::table('computador')->where('id_plano', $id)->sum('total'),
        ];
    
        return $totais; // Retorne o array de totais
    }
    
}
