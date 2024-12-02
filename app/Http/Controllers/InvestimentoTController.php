<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class InvestimentoTController extends Controller
{
    //Investimento total

    public function create($id)
    {
        Inertia::render('Inves_total',[
            'status'=>session('status')
        ]);
    }
}
