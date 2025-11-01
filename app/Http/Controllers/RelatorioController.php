<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Plano;
use App\Service\JsonDecode;
use Illuminate\Support\Facades\Log;
use Barryvdh\DomPDF\Facade\Pdf;

class RelatorioController extends Controller
{
    protected $JsonDecode;

    public function __construct(JsonDecode $JsonDecode)
    {
        $this->JsonDecode = $JsonDecode;
    }

    // Exibe relatório no React via Inertia
    public function create($id)
    {
        $plano = Plano::with([
            'executivos',
            'veiculo',
            'maquina',
            'imoveis',
            'equipamento',
            'computador',
            'moveis',
            'Forma',
            'investimento_pre',
            'Faturamento',
            'clientes',
            'concorrentes',
            'fornecedores',
            'marketing',
            'apuracao',
            'custo_fixo',
            'analise',
            'avaliacao',
            'demonstrativo',
            'socios',
            'depreciacao',
            'custo_unitario',
            'investimento_total',
            'capital_giro',
            'comercializacao'
        ])->findOrFail($id);


        $analise = $this->JsonDecode->processarAnalise($plano->analise);
        $avaliacao = $this->JsonDecode->processar_avaliacao($plano->avaliacao);

        return Inertia::render('Relatorio/Relatorio', [
            'plano' => $plano,
            'analise' => $analise,
            'avaliacao' => $avaliacao,
        ]);
    }

    // Gera o PDF completo do Plano de Negócio
    public function exportarPdf($id)
    {
        $plano = Plano::with([
            'executivos',
            'veiculo',
            'maquina',
            'imoveis',
            'equipamento',
            'computador',
            'moveis',
            'Forma',
            'investimento_pre',
            'Faturamento',
            'clientes',
            'concorrentes',
            'fornecedores',
            'marketing',
            'apuracao',
            'custo_fixo',
            'analise',
            'avaliacao',
            'demonstrativo',
            'socios',
            'depreciacao',
            'custo_unitario',
            'investimento_total',
            'capital_giro',
            'comercializacao'
        ])->findOrFail($id);

        $pdf = Pdf::loadView('pdf.relatorio', compact('plano'))
            ->setPaper('a4', 'portrait');

        $filename = 'Plano_de_Negocio_' . str_replace(' ', '_', $plano->nome) . '.pdf';

        return $pdf->download($filename);
    }
}
