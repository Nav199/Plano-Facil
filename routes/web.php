<?php

use App\Http\Controllers\EmpreendedorController;
use App\Http\Controllers\ExecutivoController;
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
Route::post('/Marketing',[MarketingController::class,'store'])->name('plano_marketing');

Route::get('/Operacional/{id}',[OperacionalController::class,'create'])->name('plano_operacional');
Route::post('/Operacional/{id}',[OperacionalController::class,'store'])->name('plano_operacional');


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
