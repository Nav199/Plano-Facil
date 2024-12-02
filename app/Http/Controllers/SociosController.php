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

    // Injetar o Serviço de Validação no Controller
   public function __construct(SociosValidationService $sociosValidationService)
    {
        $this->sociosValidationService = $sociosValidationService;
    }
        

    // Função para exibir o formulário de cadastro dos sócios
    public function create($id)
    {
        return Inertia::render('Empreendedor', [
            "planoId" => $id,
            "status" => session('status')
        ]);
    }

    // Função para armazenar os dados dos sócios
    public function store(Request $request, $id)
{
    // Validar os dados antes de salvar
    $validatedData = $request->validate([
        'socios' => 'required|array',
        'socios.*.nome' => 'required|string|max:255',
        'socios.*.cpf' => 'required|cpf|unique:socios,cpf',
        'socios.*.curriculo' => 'required|string|max:255',
        'socios.*.rua' => 'required|string|max:255',
        'socios.*.numeroRua' => 'required|string|max:255',
        'socios.*.cidade' => 'required|string|max:255',
        'socios.*.estado' => 'required|string|max:255',
        'socios.*.funcao' => 'required|string|max:255'
    ], [
        'socios.*.cpf.required' => 'O CPF é obrigatório.',
        'socios.*.cpf.cpf' => 'O CPF informado não é válido.',
        'socios.*.cpf.unique' => 'Este CPF já está cadastrado.',
    ]);

    
    $plano = Plano::findOrFail($id);

  
    foreach ($validatedData['socios'] as $socioData) {
        // Validar o CPF de cada sócio com o serviço
        if (!SociosValidationService::isValidCpf($socioData['cpf'])) {
            return back()->withErrors(['socios.*.cpf' => 'O CPF informado não é válido conforme a validação interna.'])->withInput();
        }

        // Criar o endereço do sócio
        $endereco = EnderecoSocios::create([
            'rua' => $socioData['rua'],
            'numero' => $socioData['numeroRua'],
            'cidade' => $socioData['cidade'],
            'estado' => $socioData['estado'],
        ]);

        // Criar o sócio com o endereço associado
        Socios::create([
            'id_plano' => $plano->id,
            'nome' => $socioData['nome'],
            'endereco_id' => $endereco->id,
            'cpf' => $socioData['cpf'],
            'curriculo' => $socioData['curriculo'],
            'funcao' => $socioData['funcao'],
        ]);
    }

    // Redirecionar após o cadastro dos sócios
    return redirect()->route('plano_mercado', [$plano->id])
                     ->with('status', 'Sócios cadastrados com sucesso!');
}

}
