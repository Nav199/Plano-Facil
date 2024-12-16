<?php

use App\Http\Controllers\Analise;
use App\Http\Controllers\AnaliseController;
use App\Http\Controllers\ApuracaoController;
use App\Http\Controllers\Avaliacao;
use App\Http\Controllers\AvaliacaoController;
use App\Http\Controllers\CaixaController;
use App\Http\Controllers\CnaeController;
use App\Http\Controllers\ComercializacaoController;
use App\Http\Controllers\CustoFixoController;
use App\Http\Controllers\CustoUniController;
use App\Http\Controllers\DemonstrativoController;
use App\Http\Controllers\DepreciacaoController;
use App\Http\Controllers\EstoqueController;
use App\Http\Controllers\ExecutivoController;
use App\Http\Controllers\FaturaController;
use App\Http\Controllers\InvestimentoFController;
use App\Http\Controllers\InvestimentoPController;
use App\Http\Controllers\InvestimentoTController;
use App\Http\Controllers\Mao_ObraController;
use App\Http\Controllers\MarketingController;
use App\Http\Controllers\MercadoController;
use App\Http\Controllers\OperacionalController;
use App\Http\Controllers\PlanoController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RelatorioController;
use App\Http\Controllers\SociosController;
use App\Models\Plano;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia; 

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});


Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', function () {
        $plano = Plano::where('id_user', auth()->id())->get();
        return Inertia::render('Dashboard', [
            'planos' => $plano
        ]);
    })->name('dashboard');

    Route::delete('/plano/{id}', [PlanoController::class, 'destroy'])->name('plano.destroy');


    Route::get('/Executivo', [ExecutivoController::class, 'create'])
        ->name('plano_executivo');

    Route::post('/Executivo', [ExecutivoController::class, 'store']);
  
    //rota de socios
    Route::get('/socios/{id}', [SociosController::class, 'create'])->name('socios.create');
    Route::post('/socios/{id}', [SociosController::class, 'store'])->name('socios.store');    
    
    Route::get('/Mercado/{id}', [MercadoController::class, 'create'])->name('plano_mercado');
    Route::post('/Mercado/{id}', [MercadoController::class, 'store'])->name('plano_mercado');
  
    Route::get('/Marketing/{id}', [MarketingController::class, 'create'])->name('plano_marketing');
    Route::post('/Marketing/{id}', [MarketingController::class, 'store'])->name('plano_marketing');

    Route::get('/Operacional/{id}', [OperacionalController::class, 'create'])->name('plano_operacional');
    Route::post('/Operacional/{id}', [OperacionalController::class, 'store'])->name('plano_operacional');

    Route::get('/investimento-fixo/{id}', [InvestimentoFController::class, 'create'])->name('investimento-fixo');
    Route::post('/investimento-fixo/{id}', [InvestimentoFController::class, 'store'])->name('investimento-fixo');

    Route::get('/estoque/{id}', [EstoqueController::class, 'create'])->name('estoque');
    Route::post('/estoque/{id}', [EstoqueController::class, 'store'])->name('estoque-store');
 
    Route::get('/investimento-pre/{id}',[InvestimentoPController::class, 'create'])->name('investimentoP');
    Route::post('/investimento-pre/{id}',[InvestimentoPController::class, 'store'])->name('investimentoP');

    //rota de investimento total
    Route::get('/investimento-total/{id}',[InvestimentoTController::class,'create'])->name('investimento-total');

    Route::get('/Faturamento/{id}', [FaturaController::class, 'create'])->name('faturamento');
    Route::post('/Faturamento/{id}', [FaturaController::class, 'store'])->name('faturamento');

    Route::get('/Caixa/{id}',[CaixaController::class,'create'])->name('caixa');
    Route::post('/Caixa/{id}',[CaixaController::class,'store'])->name('caixa');
    
    Route::get('/custo/{id}', [CustoUniController::class, 'create'])->name('custo');
    Route::post('/custo/{id}', [CustoUniController::class, 'store'])->name('custo-store');

    Route::get('/mao-obra/{id}', [Mao_ObraController::class, 'create'])->name('mao-obra');
    Route::post('/mao-obra/{id}', [Mao_ObraController::class, 'store'])->name('mao-obra-store');

    // Rota do Custo Fixo
    Route::get('/custo-fixo/{id}', [CustoFixoController::class, 'create'])->name('custo-fixo');
    Route::post('/custo-fixo/{id}', [CustoFixoController::class, 'store'])->name('custo-fixo');

    // Rota de depreciação
    Route::get('/depreciacao/{id}', [DepreciacaoController::class, 'create'])->name('depreciacao');
    Route::post('/depreciacao/{id}', [DepreciacaoController::class, 'store'])->name('depreciacao');
 
    // Comercialização
    Route::get('/comercializacao/{id}', [ComercializacaoController::class, 'create'])->name('comercializacao');
    Route::post('/comercializacao/{id}', [ComercializacaoController::class, 'store'])->name('comercializacao');

    // Rota de Apuração de Custo
    Route::get('/Apuracao/{id}', [ApuracaoController::class, 'create'])->name('apuracao');
    Route::post('/Apuracao/{id}', [ApuracaoController::class, 'store'])->name('apuracao');

    //Demonstrativo de Resultados
    Route::get('/Demonstrativo/{id}', [DemonstrativoController::class, 'create'])->name('demonstrativo');
    Route::post('/Demonstrativo/{id}', [DemonstrativoController::class, 'store'])->name('demonstrativo');
    
    // Analise  
    Route::get('/Analise/{id}', [AnaliseController::class, 'create'])->name('analise');
    Route::post('/Analise/{id}', [AnaliseController::class, 'store'])->name('analise');


    //Avaliação
    Route::get('/Avaliacao/{id}', [AvaliacaoController::class, 'create'])->name('avaliacao');
    Route::post('/Avaliacao/{id}', [AvaliacaoController::class, 'store'])->name('avaliacao');

    // Relatório do Plano de Negócio
    Route::get('/relatorio/{id}', [RelatorioController::class, 'create'])->name('relatorio');
 

    // Rota da Tabela Cnae
    Route::get('/cnae', [CnaeController::class, 'index']);

    // Rotas do perfil
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Requerendo o arquivo de autenticação
require __DIR__ . '/auth.php';
