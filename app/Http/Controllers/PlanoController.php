<?php

namespace App\Http\Controllers;

use App\Models\Plano;
use App\Service\ServiceGemini;
use Illuminate\Http\Request;

class PlanoController extends Controller
{
    //
    public function destroy($id)
    {
        $plano = Plano::findOrFail($id);
        $plano->delete();

        return redirect()->route('dashboard')->with('success', 'Plano excluído com sucesso!');
    }

   
}
