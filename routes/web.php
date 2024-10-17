<?php

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

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/Executivo', [ExecutivoController::class, 'create'])
    ->middleware(['auth', 'verified'])
    ->name('plano_executivo');

    Route::post('/Executivo', [ExecutivoController::class, 'store'])
    ->middleware(['auth', 'verified']);

Route::get('/Mercado/{id}',[MercadoController::class,'create'])->name('plano_mercado');
Route::post('/Mercado/{id}',[MercadoController::class,'store'])->name('plano_mercado');

Route::get('/Marketing/{id}',[MarketingController::class,'create'])->name('plano_marketing');
Route::post('/Marketing/{id}',[MarketingController::class,'store'])->name('plano_marketing');

Route::get('/Operacional/{id}',[OperacionalController::class,'create'])->name('plano_operacional');
Route::post('/Operacional/{id}',[OperacionalController::class,'store'])->name('plano_operacional');
 
Route::get('/investimento-fixo/{id}', [InvestimentoFController::class, 'create'])->name('investimento-fixo');
Route::post('/investimento-fixo/{id}', [InvestimentoFController::class, 'store'])->name('investimento-fixo');

Route::get('/estoque/{id}',[EstoqueController::class,'create'])->name('estoque');
Route::post('/estoque/{id}',[EstoqueController::class,'store'])->name('estoque-store');

Route::get('/Faturamento/{id}',[FaturaController::class,'create'])->name('faturamento');
Route::post('/Faturamento/{id}',[FaturaController::class,'store'])->name('faturamento');

Route::get('/custo/{id}',[CustoUniController::class,'create'])->name('custo');
Route::post('/custo/{id}',[CustoUniController::class,'store'])->name('custo-store');

Route::get('/mao-obra/{id}',[Mao_ObraController::class,'create']);
Route::post('/mao-obra/{id}',[Mao_ObraController::class,'store'])->name('mao-obra-store');

//rota do Custo Fixo
Route::get('/custo-fixo/{id}',[CustoFixoController::class,'create'])->name('custo-fixo');
Route::post('/custo-fixo/{id}',[CustoFixoController::class,'store'])->name('custo-fixo');

// rota depreciacao
Route::get('/depreciacao/{id}',[DepreciacaoController::class,'create']);


// rota da Tabela Cnae
Route::get('/cnae', [CnaeController::class, 'index']);



Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
