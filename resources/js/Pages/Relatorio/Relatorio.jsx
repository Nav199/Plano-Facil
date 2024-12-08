import React from 'react';
import { usePage } from '@inertiajs/react';

const Relatorio = () => {
  const { plano, status, message, aiAnalysis } = usePage().props;

  // Função para formatar o preço em R$
  const formatarPreco = (preco) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(preco || 0);  // Caso não tenha preço, exibe R$ 0,00
  };

  // Função para extrair o texto da análise da IA
  const obterAnaliseIA = () => {
    if (aiAnalysis && aiAnalysis.response && aiAnalysis.response.candidates?.length > 0) {
      const analise = aiAnalysis.response.candidates[0].content?.text || 'Nenhuma análise disponível.';
      return analise;
    }
    return 'Ainda não há análise disponível para este plano.';
  };
  

  return (
    <div className="bg-gray-100 min-h-screen p-4 space-y-6">
      <header className="text-center bg-blue-500 text-white py-4">
        <h1 className="text-2xl font-bold">Plano de Negócio - {plano?.nome}</h1>
      </header>
      <main id="relatorio-content" className="space-y-6">
        {/* Mostrar mensagem caso não tenha dados */}
        {message ? (
          <div className="bg-red-100 text-red-700 p-4 rounded">
            <p>{message}</p>
          </div>
        ) : (
          <>
            {/* Seção: Missão, Visão e Valores */}
            <section className="bg-white shadow rounded p-4">
              <h2 className="text-xl font-bold mb-2">Missão, Visão e Valores</h2>
              {plano?.executivos?.length ? (
                <ul className="list-disc ml-4">
                  {plano.executivos.map((executivo, index) => (
                    <li key={index}>
                      <p><strong>Visão:</strong> {executivo.visao}</p>
                      <p><strong>Valores:</strong> {executivo.valores}</p>
                      <p><strong>Missão:</strong> {executivo.missao}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>Nenhum dado encontrado.</p>
              )}
            </section>

            {/* Seção: Executivos */}
            <section className="bg-white shadow rounded p-4">
              <h2 className="text-xl font-bold mb-2">Plano Executivo</h2>
              {plano?.executivos?.length ? (
                <ul className="list-disc ml-4">
                  {plano.executivos.map((executivo, index) => (
                    <li key={index}>
                      <p><strong>Nome:</strong> {executivo.nome}</p>
                      <p><strong>Cargo:</strong> {executivo.cargo}</p>
                      <p><strong>Fonte de Recursos:</strong> {executivo.fonte_recursos}</p>
                      <p><strong>Visão:</strong> {executivo.visao}</p>
                      <p><strong>Valores:</strong> {executivo.valores}</p>
                      <p><strong>Missão:</strong> {executivo.missao}</p>
                      <p><strong>Setor de Atividade:</strong> {executivo.setor_atividade}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>Nenhum executivo registrado.</p>
              )}
            </section>

            {/* Seção: Análise de Mercado */}
            <section className="bg-white shadow rounded p-4">
              <h2 className="text-xl font-bold mb-2">Pesquisa de Mercado</h2>

              {/* Seção de Clientes */}
              {plano?.clientes?.length ? (
                <div>
                  <h3 className="text-lg font-semibold mb-2">Clientes</h3>
                  <ul className="list-disc ml-4">
                    {plano.clientes.map((cliente, index) => (
                      <li key={index}>
                        <p><strong>Perfil dos Clientes:</strong> {cliente.perfil}</p>
                        <p><strong>Comportamento dos Clientes:</strong> {cliente.comportamento}</p>
                        <p><strong>Área de Abrangência:</strong> {cliente.area}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p>Nenhum cliente registrado.</p>
              )}

              {/* Seção de Fornecedores */}
              {plano?.fornecedores?.length ? (
                <div className="mt-4">
                  <h3 className="text-lg font-semibold mb-2">Fornecedores</h3>
                  <ul className="list-disc ml-4">
                    {plano.fornecedores.map((fornecedor, index) => (
                      <li key={index}>
                        <p><strong>Descrição:</strong> {fornecedor.descricao}</p>
                        <p><strong>Nome:</strong> {fornecedor.nome}</p>
                        <p><strong>Preço:</strong> {formatarPreco(fornecedor.preco)}</p>
                        <p><strong>Pagamento:</strong> {fornecedor.pagamento}</p>
                        <p><strong>Localização:</strong> {fornecedor.localizacao}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p>Nenhum fornecedor registrado.</p>
              )}

              {/* Seção de Concorrentes */}
              {plano?.concorrentes?.length ? (
                <div className="mt-4">
                  <h3 className="text-lg font-semibold mb-2">Concorrentes</h3>
                  <ul className="list-disc ml-4">
                    {plano.concorrentes.map((concorrente, index) => (
                      <li key={index}>
                        <p><strong>Nome:</strong> {concorrente.nome}</p>
                        <p><strong>Qualidade:</strong> {concorrente.qualidade}</p>
                        <p><strong>Pagamento:</strong> {concorrente.pagamento}</p>
                        <p><strong>Preço:</strong> {formatarPreco(concorrente.preco)}</p>
                        <p><strong>Garantias:</strong> {concorrente.garantias}</p>
                        <p><strong>Serviço:</strong> {concorrente.servico}</p>
                        <p><strong>Localização:</strong> {concorrente.localizacao}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p>Nenhum concorrente registrado.</p>
              )}
            </section>

            {/* Seção: Marketing */}
            <section className="bg-white shadow rounded p-4">
              <h2 className="text-xl font-bold mb-2">Estratégias de Marketing</h2>
              {plano?.marketing?.length ? (
                <ul className="list-disc ml-4">
                  {plano.marketing.map((m, index) => (
                    <li key={index}>
                      <p><strong>Produto:</strong> {m.produto}</p>
                      <p><strong>Preço:</strong> {formatarPreco(m.preco)}</p>
                      <p><strong>Estratégia de Promocionais:</strong> {m.estrategia_promo}</p>
                      <p><strong>Estratégia de Comercialização:</strong> {m.estrategia_comer}</p>
                      <p><strong>Localização:</strong> {m.localizacao}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>Nenhum marketing registrado.</p>
              )}
              <div>
                <p>Análise pela IA</p>
              </div>
            </section>

             {/* Seção: Potencial Inovativo */}
             <section>
               <h2 className="text-xl font-bold mb-2">Potencial Inovativo do Plano de Negócio</h2>
              
             </section>

            {/* Seção: Investimento Pré-Operacional */}
            <section className="bg-white shadow rounded p-4">
              <h2 className="text-xl font-bold mb-2">Investimento Pré-Operacional</h2>
              {plano?.investimento_pre?.length ? (
                <ul className="list-disc ml-4">
                  {plano.investimento_pre.map((investimento, index) => (
                    <li key={index}>
                      {investimento.descricao} - {formatarPreco(investimento.valor)}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>Nenhum investimento pré-operacional registrado.</p>
              )}
            </section>

            {/* Seção: Faturamento */}
            <section className="bg-white shadow rounded p-4">
              <h2 className="text-xl font-bold mb-2">Faturamento</h2>
              {plano?.Faturamento?.length ? (
                <ul className="list-disc ml-4">
                  {plano.Faturamento.map((faturamento, index) => (
                    <li key={index}>
                      {faturamento.produto} - {formatarPreco(faturamento.valor)}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>Nenhum dado de faturamento registrado.</p>
              )}
            </section>

            <section>
                  Investimento Necessário
                </section>

              <section className="bg-white shadow rounded p-4">
              <h2 className="text-xl font-bold mb-2">Capital de Giro</h2>

            </section>
            <section className="bg-white shadow rounded p-4">
              <h2 className="text-xl font-bold mb-2">Demonstrativo de Resultados</h2>

            </section>

            <section className="bg-white shadow rounded p-4">
              <h2 className="text-xl font-bold mb-2">Análise Swot</h2>

            </section>


            <section className="bg-white shadow rounded p-4">
              <h2 className="text-xl font-bold mb-2">Análise de Cenário</h2>

            </section>

            <section className="bg-white shadow rounded p-4">
              <h2 className="text-xl font-bold mb-2">Viabilidade Financeira do Negócio</h2>

            </section>

            {/* Seção: Análise da IA */}
            
<section className="bg-white shadow rounded p-4">
  <h2 className="text-xl font-bold mb-2">Análise da IA</h2>
  <div className="prose">
    {aiAnalysis && aiAnalysis.viabilidade ? (
      aiAnalysis.viabilidade.map((viabilidade, index) => (
        <p key={index}>{index + 1}. {viabilidade}</p>
      ))
    ) : (
      <p>Nenhuma análise de viabilidade disponível.</p>
    )}
  </div>
</section>

          </>
        )}
      </main>

      <footer className="text-center bg-blue-500 text-white py-4">
        <p>&copy; 2024 - Todos os direitos reservados.</p>
      </footer>
    </div>
  );
};

export default Relatorio;
