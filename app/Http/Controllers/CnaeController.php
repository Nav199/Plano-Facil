<?php

namespace App\Http\Controllers;

use App\Service\CnaeService;
use Illuminate\Http\Request;

class CnaeController extends Controller
{
    //Controller do Mock da tabela CNAE

    protected $cnaeService;
    public function __construct(CnaeService $cnaeService)
    {
        $this->cnaeService = $cnaeService;
    }

    public function index() {
        return response()->json($this->cnaeService->getCnaeData());
    }
 
}
