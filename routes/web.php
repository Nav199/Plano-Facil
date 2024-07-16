<?php

use App\Http\Controllers\EmpreendedorController;
use App\Http\Controllers\ExecutivoController;
use App\Http\Controllers\MercadoController;
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

Route::get('/Mercado',[MercadoController::class,'create']);


 Route::get('/Empreendedor',[EmpreendedorController::class,'create'])
 ->middleware(['auth', 'verified'])
 ->name('socios');
 
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
