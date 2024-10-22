<?php

use App\Http\Controllers\ApuracaoController;
use App\Http\Controllers\CnaeController;
use App\Http\Controllers\CustoFixoController;
use App\Http\Controllers\CustoUniController;
use App\Http\Controllers\DepreciacaoController;
use App\Http\Controllers\EstoqueController;
use App\Http\Controllers\ExecutivoController;
use App\Http\Controllers\FaturaController;
use App\Http\Controllers\InvestimentoFController;
use App\Http\Controllers\Mao_ObraController;
use App\Http\Controllers\MarketingController;
use App\Http\Controllers\MercadoController;
use App\Http\Controllers\OperacionalController;
use App\Http\Controllers\ProfileController;
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

    Route::get('/Executivo', [ExecutivoController::class, 'create'])
        ->name('plano_executivo');

    Route::post('/Executivo', [ExecutivoController::class, 'store']);
  
    //rota de socios
    Route::get('/socios', [SociosController::class, 'create'])->name('socios');
    Route::post('/socios', [SociosController::class, 'store'])->name('socios');
    
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

    Route::get('/Faturamento/{id}', [FaturaController::class, 'create'])->name('faturamento');
    Route::post('/Faturamento/{id}', [FaturaController::class, 'store'])->name('faturamento');

    Route::get('/custo/{id}', [CustoUniController::class, 'create'])->name('custo');
    Route::post('/custo/{id}', [CustoUniController::class, 'store'])->name('custo-store');

    Route::get('/mao-obra/{id}', [Mao_ObraController::class, 'create'])->name('mao-obra');
    Route::post('/mao-obra/{id}', [Mao_ObraController::class, 'store'])->name('mao-obra-store');

    // Rota do Custo Fixo
    Route::get('/custo-fixo/{id}', [CustoFixoController::class, 'create'])->name('custo-fixo');
    Route::post('/custo-fixo/{id}', [CustoFixoController::class, 'store'])->name('custo-fixo');

    // Rota de depreciação
    Route::get('/depreciacao/{id}', [DepreciacaoController::class, 'create'])->name('depreciacao');

    // Rota de Apuração de Custo
    Route::get('/Apuracao/{id}', [ApuracaoController::class, 'create'])->name('apuracao');
    Route::post('/Apuracao/{id}', [ApuracaoController::class, 'store'])->name('apuracao');

    // Rota da Tabela Cnae
    Route::get('/cnae', [CnaeController::class, 'index']);

    // Rotas do perfil
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Requerendo o arquivo de autenticação
require __DIR__ . '/auth.php';
