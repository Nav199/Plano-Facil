<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <title>Plano de Negócio - {{ $plano->nome }}</title>
    <style>
        body { font-family: DejaVu Sans, sans-serif; font-size: 11px; color: #222; margin: 40px; }
        h1, h2, h3 { text-align: center; }
        h1 { font-size: 20px; }
        h2 { font-size: 15px; margin-top: 20px; border-bottom: 1px solid #999; padding-bottom: 4px; }
        h3 { font-size: 13px; margin-top: 10px; }
        table { width: 100%; border-collapse: collapse; margin: 10px 0; }
        th, td { border: 1px solid #999; padding: 5px; text-align: left; }
        th { background-color: #f2f2f2; }
        .section { margin-top: 25px; }
        .center { text-align: center; }
        .footer { text-align: center; font-size: 10px; margin-top: 40px; }
    </style>
</head>
<body>

<h1>Plano de Negócio</h1>
<h2>{{ $plano->nome }}</h2>
<p class="center"><em>Relatório Gerado Automaticamente</em></p>
<hr>

{{-- =========================================================
    1 - SUMÁRIO EXECUTIVO
========================================================= --}}
<div class="section">
    <h2>1. Sumário Executivo</h2>

    <h3>1.1 Resumo dos Principais Pontos</h3>
    @forelse($plano->executivos as $exec)
        <p><strong>Missão:</strong> {{ $exec->missao }}</p>
        <p><strong>Visão:</strong> {{ $exec->visao }}</p>
        <p><strong>Valores:</strong> {{ $exec->valores }}</p>
    @empty
        <p>Nenhum resumo cadastrado.</p>
    @endforelse

    <h3>1.2 Dados dos Empreendedores</h3>
    @if($plano->socios->isNotEmpty())
        <table>
            <thead><tr><th>Nome</th><th>Participação</th><th>Função</th></tr></thead>
            <tbody>
                @foreach($plano->socios as $s)
                    <tr><td>{{ $s->nome }}</td><td>{{ $s->participacao ?? '---' }}</td><td>{{ $s->funcao ?? '---' }}</td></tr>
                @endforeach
            </tbody>
        </table>
    @else
        <p>Nenhum empreendedor cadastrado.</p>
    @endif

    <h3>1.3 Dados do Empreendimento</h3>
    <p><strong>Nome:</strong> {{ $plano->nome }}</p>

    <h3>1.4 Missão da Empresa</h3>
    @forelse($plano->executivos as $exec)
        <p>{{ $exec->missao }}</p>
    @empty
        <p>Missão não informada.</p>
    @endforelse

    <h3>1.5 Setor de Atividade</h3>
    @forelse($plano->executivos as $exec)
        <p>{{ $exec->setor_atividade }}</p>
    @empty
        <p>Setor não informado.</p>
    @endforelse

    <h3>1.6 Forma Jurídica</h3>
    @if($plano->forma->isNotEmpty())
        <p>{{ $plano->forma->first()->tipo }}</p>
    @else
        <p>Forma jurídica não registrada.</p>
    @endif

    <h3>1.7 Fonte de Recursos</h3>
    @forelse($plano->executivos as $exec)
        <p>{{ $exec->fonte_recursos }}</p>
    @empty
        <p>Fonte de recursos não informada.</p>
    @endforelse
</div>

{{-- =========================================================
    2 - ANÁLISE DE MERCADO
========================================================= --}}
<div class="section">
    <h2>2. Análise de Mercado</h2>

    <h3>2.1 Estudo dos Clientes</h3>
    @if($plano->clientes->isNotEmpty())
        <table>
            <thead><tr><th>Perfil</th><th>Comportamento</th><th>Área</th></tr></thead>
            <tbody>
                @foreach($plano->clientes as $c)
                    <tr><td>{{ $c->perfil }}</td><td>{{ $c->comportamento }}</td><td>{{ $c->area }}</td></tr>
                @endforeach
            </tbody>
        </table>
    @else
        <p>Nenhum cliente cadastrado.</p>
    @endif

    <h3>2.2 Estudo dos Concorrentes</h3>
    @if($plano->concorrentes->isNotEmpty())
        <table>
            <thead><tr><th>Nome</th><th>Qualidade</th><th>Preço</th><th>Serviço</th><th>Localização</th></tr></thead>
            <tbody>
                @foreach($plano->concorrentes as $conc)
                    <tr>
                        <td>{{ $conc->nome }}</td>
                        <td>{{ $conc->qualidade }}</td>
                        <td>R$ {{ number_format($conc->preco, 2, ',', '.') }}</td>
                        <td>{{ $conc->servico }}</td>
                        <td>{{ $conc->localizacao }}</td>
                    </tr>
                @endforeach
            </tbody>
        </table>
    @else
        <p>Nenhum concorrente cadastrado.</p>
    @endif

    <h3>2.3 Estudo dos Fornecedores</h3>
    @if($plano->fornecedores->isNotEmpty())
        <table>
            <thead><tr><th>Nome</th><th>Descrição</th><th>Preço</th><th>Pagamento</th><th>Localização</th></tr></thead>
            <tbody>
                @foreach($plano->fornecedores as $f)
                    <tr>
                        <td>{{ $f->nome }}</td>
                        <td>{{ $f->descricao }}</td>
                        <td>R$ {{ number_format($f->preco, 2, ',', '.') }}</td>
                        <td>{{ $f->pagamento }}</td>
                        <td>{{ $f->localizacao }}</td>
                    </tr>
                @endforeach
            </tbody>
        </table>
    @else
        <p>Nenhum fornecedor cadastrado.</p>
    @endif
</div>

{{-- =========================================================
    3 - PLANO DE MARKETING
========================================================= --}}
<div class="section">
    <h2>3. Plano de Marketing</h2>
    @if($plano->marketing->isNotEmpty())
        <table>
            <thead><tr><th>Produto</th><th>Preço</th><th>Promoção</th><th>Localização</th></tr></thead>
            <tbody>
                @foreach($plano->marketing as $m)
                    <tr>
                        <td>{{ $m->produto }}</td>
                        <td>R$ {{ number_format($m->preco, 2, ',', '.') }}</td>
                        <td>{{ $m->estrategia_promo }}</td>
                        <td>{{ $m->localizacao }}</td>
                    </tr>
                @endforeach
            </tbody>
        </table>
    @else
        <p>Nenhum registro de marketing encontrado.</p>
    @endif
</div>

{{-- =========================================================
    4 - PLANO OPERACIONAL
========================================================= --}}
<div class="section">
    <h2>4. Plano Operacional</h2>
    @if($plano->operacional->isNotEmpty())
        @foreach($plano->operacional as $op)
            <p><strong>Layout:</strong> {{ $op->layout ?? '---' }}</p>
            <p><strong>Capacidade:</strong> {{ $op->capacidade ?? '---' }}</p>
            <p><strong>Processos Operacionais:</strong> {{ $op->processos ?? '---' }}</p>
            <p><strong>Necessidade de Pessoal:</strong> {{ $op->pessoal ?? '---' }}</p>
        @endforeach
    @else
        <p>Nenhum dado operacional registrado.</p>
    @endif
</div>

{{-- =========================================================
    5 - PLANO FINANCEIRO
========================================================= --}}
<div class="section">
    <h2>5. Plano Financeiro</h2>

    <h3>5.1 Faturamento</h3>
    @if($plano->faturamento->isNotEmpty())
        <table>
            <thead><tr><th>Produto</th><th>Qtd</th><th>Valor Unitário</th><th>Total</th></tr></thead>
            <tbody>
                @foreach($plano->faturamento as $f)
                    <tr>
                        <td>{{ $f->produto }}</td>
                        <td>{{ $f->quantidade }}</td>
                        <td>R$ {{ number_format($f->valor_unitario, 2, ',', '.') }}</td>
                        <td>R$ {{ number_format($f->total, 2, ',', '.') }}</td>
                    </tr>
                @endforeach
            </tbody>
        </table>
    @else
        <p>Nenhum dado de faturamento.</p>
    @endif

    <h3>5.2 Investimentos</h3>
    @if($plano->investimento_total->isNotEmpty())
        <p><strong>Total do Empreendimento:</strong>
            R$ {{ number_format($plano->investimento_total->first()->total_investimento, 2, ',', '.') }}
        </p>
    @else
        <p>Nenhum investimento total cadastrado.</p>
    @endif

    <h3>5.3 Custos Fixos</h3>
    @if($plano->custo_fixo->isNotEmpty())
        <table>
            <thead><tr><th>Descrição</th><th>Valor</th></tr></thead>
            <tbody>
                @foreach($plano->custo_fixo as $c)
                    <tr><td>{{ $c->descricao }}</td><td>R$ {{ number_format($c->custo, 2, ',', '.') }}</td></tr>
                @endforeach
            </tbody>
        </table>
    @else
        <p>Nenhum custo fixo informado.</p>
    @endif

    <h3>5.7 Comercialização</h3>
    @if($plano->comercializacao->isNotEmpty())
        @foreach($plano->comercializacao as $com)
            <p><strong>Total de Impostos:</strong> R$ {{ number_format($com->total_impostos, 2, ',', '.') }}</p>
            <p><strong>Total de Gastos com Vendas:</strong> R$ {{ number_format($com->total_gastos_vendas, 2, ',', '.') }}</p>
            <p><strong>Total Geral:</strong> R$ {{ number_format($com->total_geral, 2, ',', '.') }}</p>
        @endforeach
    @else
        <p>Nenhum dado de comercialização registrado.</p>
    @endif
</div>

{{-- =========================================================
    6 - CONSTRUÇÃO DE CENÁRIOS
========================================================= --}}
<div class="section">
    <h2>6. Construção de Cenários</h2>
    <p>Espaço reservado para cenários futuros e projeções estratégicas.</p>
</div>

{{-- =========================================================
    7 - AVALIAÇÃO ESTRATÉGICA (SWOT)
========================================================= --}}
<div class="section">
    <h2>7. Avaliação Estratégica (Análise SWOT)</h2>
    @forelse($plano->analise as $a)
        <p><strong>Forças:</strong> {{ $a->forcas }}</p>
        <p><strong>Fraquezas:</strong> {{ $a->fraquezas }}</p>
        <p><strong>Oportunidades:</strong> {{ $a->oportunidades }}</p>
        <p><strong>Ameaças:</strong> {{ $a->ameacas }}</p>
    @empty
        <p>Não há análise SWOT registrada.</p>
    @endforelse
</div>

{{-- =========================================================
    8 - AVALIAÇÃO DA IA
========================================================= --}}
<div class="section">
    <h2>8. Avaliação da Inteligência Artificial</h2>
    @forelse($plano->avaliacao as $av)
        <p><strong>Análise:</strong> {{ $av->analise }}</p>
    @empty
        <p>Sem análise automatizada disponível.</p>
    @endforelse
</div>

<div class="footer">
    <hr>
    <p>© {{ date('Y') }} - Sistema de Plano de Negócios Automatizado</p>
    <p><em>Análise automatizada — consulte um especialista para validação.</em></p>
</div>

</body>
</html>
