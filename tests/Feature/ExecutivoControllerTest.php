<?php

namespace Tests\Feature;

use App\Models\User;
use App\Models\Plano;
use App\Models\Forma;
use App\Models\Executivo;
use App\Models\Enquadramento;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ExecutivoControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_usuario_autenticado_pode_criar_plano_executivo()
    {
        // Arrange - Cria um usuário autenticado
        $user = User::factory()->create();
        $this->actingAs($user);

        // Simula retorno do CnaeService
        $this->mock(\App\Service\CnaeService::class, function ($mock) {
            $mock->shouldReceive('getCnaeData')->once()->andReturn([
                ['CNAE' => '9329804', 'Descrição' => 'Exploração de jogos eletrônicos recreativos'],
            ]);
        });

        // Act - Envia requisição POST com dados válidos
        $response = $this->post('/Executivo', [
            'nome' => 'Empresa Teste',
            'cpfCnpj' => '12345678901',
            'missao' => 'Criar soluções tecnológicas.',
            'setorAtividade' => '6201-5/01',
            'formaJuridica' => 'MEI',
            'enquadramentoTributario' => 'Simples Nacional',
            'visao' => 'Ser líder no mercado.',
            'valores' => 'Inovação, ética.',
            'fonteRecursos' => 'Investidores e receitas próprias.',
        ]);

        // Assert - Verifica redirecionamento e dados no banco
        $response->assertRedirectContains('/socios/create');

        $this->assertDatabaseHas('plano', ['nome' => 'Empresa Teste']);
        $this->assertDatabaseHas('executivo', ['nome_empresa' => 'Empresa Teste']);
        $this->assertDatabaseHas('forma', ['tipo' => 'MEI']);
        $this->assertDatabaseHas('enquadramento', ['tipo' => 'Simples Nacional']);
    }

    public function test_valida_erros_se_campos_obrigatorios_faltarem()
    {
        $user = User::factory()->create();
        $this->actingAs($user);

        $response = $this->post('/Executivo', []); // Dados vazios

        $response->assertSessionHasErrors(['nome', 'cpfCnpj', 'setorAtividade', 'formaJuridica', 'enquadramentoTributario']);
    }
}
