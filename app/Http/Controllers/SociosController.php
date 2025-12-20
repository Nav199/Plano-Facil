<?php

namespace App\Http\Controllers;

use App\Service\SociosValidationService;
use App\Models\EnderecoSocios;
use App\Models\Plano;
use App\Models\Socios;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SociosController extends Controller
{
    protected $sociosValidationService;

    public function __construct(SociosValidationService $sociosValidationService)
    {
        $this->sociosValidationService = $sociosValidationService;
    }

    public function create($id)
    {
        return Inertia::render('Empreendedor', [
            "planoId" => $id,
            "status" => session('status')
        ]);
    }

    public function store(Request $request, $id)
    {
        $validatedData = $request->validate([
            'socios' => 'required|array|min:1',
            'socios.*.nome' => 'required|string|max:255',
            'socios.*.cpf' => 'required|cpf|distinct|unique:socios,cpf',
            'socios.*.curriculo' => 'required|string|max:255',
            'socios.*.rua' => 'required|string|max:255',
            'socios.*.numeroRua' => 'required|string|max:255',
            'socios.*.cidade' => 'required|string|max:255',
            'socios.*.estado' => 'required|string|max:255',
            'socios.*.funcao' => 'required|string|max:255',
            'socios.*.capitalInvestido' => 'required|numeric|min:0',
            'socios.*.participacao' => 'required|numeric|min:0|max:100',
        ]);
        
        $plano = Plano::findOrFail($id);

        foreach ($validatedData['socios'] as $socioData) {
            if (!SociosValidationService::isValidCpf($socioData['cpf'])) {
                return back()->withErrors(['socios.*.cpf' => 'O CPF informado não é válido conforme a validação interna.'])->withInput();
            }

            $endereco = EnderecoSocios::create([
                'rua' => $socioData['rua'],
                'numero' => $socioData['numeroRua'],
                'cidade' => $socioData['cidade'],
                'estado' => $socioData['estado'],
            ]);

            Socios::create([
                'id_plano' => $plano->id,
                'nome' => $socioData['nome'],
                'endereco_id' => $endereco->id,
                'cpf' => $socioData['cpf'],
                'curriculo' => $socioData['curriculo'],
                'funcao' => $socioData['funcao'],
                'capital_investido' => $socioData['capitalInvestido'],
                'participacao' => $socioData['participacao']

            ]);
        }

        return redirect()->route('plano_mercado', [$plano->id])
                         ->with('status', 'Sócios cadastrados com sucesso!');
    }

}
