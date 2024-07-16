<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class MercadoController extends Controller
{
    public function create():Response
    {
        return Inertia::render('Mercado',[
            'status'=>session('status')
        ]);
    }
}
